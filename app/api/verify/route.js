import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";
import { SMTPServer } from "smtp-server";
import nodeMailer from "nodemailer";

export async function GET(req, res) {
  try {
    const server = new SMTPServer({
      authOptional: true,
      onData(stream, session, callback) {
        stream.on("data", () => {});
        stream.on("end", callback);
      },
      onMailFrom(address, session, callback) {
        callback(); // Accept the mail from address
      },
      onRcptTo(address, session, callback) {
        // Check if the recipient address is the one you want to verify
        if (address.address === "recipient@example.com") {
          session.isEmailActive = true;
        }
        callback(); // Accept the recipient address
      },
      onmail(address, session, callback) {
        if (session.isEmailActive) {
          console.log(`Email address ${address.address} is active`);
        } else {
          console.log(`Email address ${address.address} is inactive`);
        }
        callback(); // Return back to the pool
      },
    });

    server.listen(465, () => {
      console.log("SMTP server listening on port 465");
    });

    const transporter = nodeMailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        clientId: "419399943818-1kunkdcqnkds1ten4gul26g3enn1ffns.apps.googleusercontent.com",
        clientSecret: "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",
        user: "aakifahamath@gmail.com",
        refreshToken:
          "1//05FhA_QXpW6huCgYIARAAGAUSNwF-L9IreZ90M3Cicv6sKaOHx3HNuihP4rGkATwYNUUJGqDK5cbbPShkBP5LJgdiBuhsbntBHGo",
        accessToken:
          "ya29.a0AXooCgtA2slafGLK6p-1W9KNt9yOBNOiArKPtb6045V-4p_-WPhLTUOFZLM1-mNJvtvErCmc3pWmS9loyqs7CAYrNNOgPp8gEokF_Dyh_RIkfK8ilVlfzTjpqhALaSfJruR9QzrB4QcP2aKKVOIkc3X35aCUhB5Btk67aCgYKAe4SARASFQHGX2MiQ-WY9xIwvJbKSyKmiqUu5g0171",
      },
    });

    // Send out email
    const info = await transporter.sendMail({
      from: "aakifahamath@gmail.com",
      to: "aakifmohamed@elostack.com",
      subject: "Subject",
      text: "Body",
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
