import { createClient } from "npm:@supabase/supabase-js@2.41.1";
import nodeMailer from "npm:nodemailer@6.9.13";
import { Buffer } from "https://deno.land/std@0.136.0/node/buffer.ts";

const supabase = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_ANON_KEY"));

Deno.serve(async (req, res) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed!", {
      status: 405,
    });
  }

  const authHeader = req.headers.get("authorization");
  const request = await req.json();
  const freeTier = request["freeTier"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    if (authHeader.split(" ")[1] !== Deno.env.get("CRON_SECRET")) {
      return new Response("Unauthorized!", { status: 401 });
    }
  } else {
    return new Response("Unauthorized!", { status: 401 });
  }

  try {
    // Authentication
    const auth = await supabase.auth.signInWithPassword({
      email: Deno.env.get("ADMIN_EMAIL"),
      password: Deno.env.get("ADMIN_PASSWORD"),
    });
    if (auth.error) throw auth.error;

    const subscriber = await supabase.from("subscriber").select("*, user(*)");

    console.log("Beginning email loop...");
    for (const user of subscriber.data) {
      console.log(`Going to user ${user.user_id}`);
      try {
        // Check if user's subscription is active
        if (!user.active) continue;

        // Check if user's access & refresh token are available
        const dateNow = Date.now();
        const date = new Date(dateNow);
        const gmt = date.toLocaleString("en-US", { timeZone: "GMT" });
        const gmtDate = new Date(gmt);
        if (
          !user.refresh_token ||
          (!user.refresh_token && user.access_token && Date.parse(user.oauth_expiry_date) < gmtDate.getTime())
        ) {
          const { error } = await supabase.rpc("toggle_subscriber_active", {
            subscriber_user_id: user.user_id,
            new_status: false,
          });
          if (error) throw error;
          const results = await supabase
            .from("subscriber")
            .update({ refresh_token: null, access_token: null })
            .eq("user_id", user.user_id);
          if (results.error) throw results.error;
          throw Error("Refresh and access token not found!");
        }

        if ((user.user.credits > 0 && freeTier) || (!freeTier && user.user.credits <= 0)) continue;

        // Find lead
        let chosenLead;
        chosenLead = await supabase.rpc("find_matching_lead", {
          subscriber_user_id: user.user_id,
          states: user.options.states,
          companies: user.options.companies,
          seniorities: user.options.seniorities,
        });
        if (chosenLead.error) throw chosenLead.error;
        chosenLead = chosenLead.data[0];

        // If lead is found start emailing process
        if (chosenLead) {
          try {
            // Fetch attachments
            let results = await supabase.storage.from("attachments").list(user.user_id, {
              limit: 100,
              offset: 0,
              sortBy: { column: "name", order: "asc" },
            });
            if (results.error) throw results.error;

            // Store as Buffer in attachments[]
            const attachments = [];
            for (let attachment of results.data) {
              results = await supabase.storage.from("attachments").download(`${user.user_id}/${attachment.name}`);
              const arrayBuffer = await results.data.arrayBuffer();
              const buffer = Buffer.from(arrayBuffer);
              attachments.push({ filename: attachment.name, content: buffer });
            }

            // Format the email subject/body
            const formattedTemplate = user.email_body
              .replace(/{{LEAD_FIRST_NAME}}/g, chosenLead.first_name)
              .replace(/{{LEAD_LAST_NAME}}/g, chosenLead.last_name)
              .replace(/{{COMPANY}}/g, chosenLead.organization_name);
            const formattedSubject = user.email_subject
              .replace(/{{LEAD_FIRST_NAME}}/g, chosenLead.first_name)
              .replace(/{{LEAD_LAST_NAME}}/g, chosenLead.last_name)
              .replace(/{{COMPANY}}/g, chosenLead.organization_name);

            const transporter = nodeMailer.createTransport({
              service: "Gmail",
              host: "smtp.gmail.com",
              port: 465,
              secure: true,
              auth: {
                type: "OAuth2",
                clientId: Deno.env.get("GOOGLE_OAUTH_CLIENT_ID"),
                clientSecret: Deno.env.get("GOOGLE_OAUTH_CLIENT_SECRET"),
                user: user.user.email,
                refreshToken: user.refresh_token,
                accessToken: user.access_token,
              },
            });

            // Send out email
            const info = await transporter.sendMail({
              from: user.user.email,
              to: chosenLead.email,
              subject: formattedSubject,
              text: formattedTemplate,
              attachments,
            });

            console.log(`Email ${info.messageId} sent!`);

            // Increment the send count if the record does exist
            results = await supabase.rpc("increment_monthly_send_count", { lead_id: chosenLead.id });
            if (results.error) throw results.error;
            if (!results.data) {
              console.error("Lead has already met their monthly limit!");
              continue;
            }
            console.log("Lead monthly send count incremented!");

            // Check if user has sufficient credits and decrement if true, otherwise go to next user
            if (!freeTier) {
              results = await supabase.rpc("decrement_subscriber_credits", {
                subscriber_user_id: user.user_id,
              });
              if (results.error) throw results.error;
              if (!results.data) {
                console.error("Insufficient credits!");
                continue;
              }
              console.log("Credits decremented successfully!");
            }

            // Create a record of the application if email succeeds
            results = await supabase.from("application").insert({ user_id: user.user_id, lead_id: chosenLead.id });
            if (results.error) throw results.error;
            console.log("Application record created!");
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log("No lead was found!");
          const { error } = await supabase.rpc("subscriber_leads_exhausted", {
            subscriber_user_id: user.user_id,
          });
          if (error) throw error;
        }
      } catch (error) {
        console.error(error);
      }
    }
    console.log("Emails sent successfully!");

    return new Response("Emails sent successfully!", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(error, { status: 500 });
  }
});
