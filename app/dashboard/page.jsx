"use client";

import NavBar from "@/components/common/NavBar";
import Loader from "@/components/common/Loader";
import { UserContext } from "@/context/UserContext";
import { useEffect, useContext, useState, Suspense } from "react";
import Head from "next/head";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { profileStore } from "@/components/individual/profileStore";
import Footer from "@/components/common/Footer";

const Page = () => {
  return (
    <div className="flex flex-1 flex-col">
      <NavBar />
      <div className="flex flex-1">
        <div className="flex flex-col min-h-screen text-white w-full bg-gradient-to-b from-[#0f0f1c] via-[#1b1b29] to-[#251b30]">
          <Head>
            <title>Individual Dashboard | EloStack</title>
          </Head>
          <Suspense>
            <Dashboard />
          </Suspense>
          <Footer />
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { session } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [purchase, setPurchase] = useState(null);
  const [bookInterview, setBookInterview] = useState(false);
  const { profileData, setProfileData } = profileStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadData = async () => {
      if (session?.data?.session) {
        await fetchUser();
      } else {
        router.push("/signin");
      }
    };

    if (session) {
      if (searchParams.has("success")) {
        toast.success("Purchase made successfully!");
      } else if (searchParams.has("cancelled")) {
        toast.error("Purchase was unsuccessful!");
      } else if (searchParams.has("code") && searchParams.has("scope")) {
        handleEmailGranted();
      }

      loadData();
    }
  }, [session]);

  const handleEmailGranted = async () => {
    const userId = session.data.session?.user.id;
    if (!session) return;
    const response = await fetch("/api/oauth/save-permission", {
      method: "POST",
      headers: {
        "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
      },
      body: JSON.stringify({
        code: searchParams.get("code"),
        user_id: userId,
      }),
    });
    if (response.status === 201) {
      toast.success("Permission granted!");
    }
  };

  const fetchApplications = async () => {
    const userId = session.data.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/application/${userId}?latest=true`, {
        method: "GET",
        headers: {
          "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
        },
      });
      if (response.status === 200) {
        const results = await response.json();
        setApplications(results.data);
      }
    }
  };

  const fetchIndividual = async () => {
    const userId = session?.data.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/individual/${userId}`);
      const result = await response.json();
      if (response.status === 200) {
        setProfileData(result.individual);
        await fetchPurchase();
        setLoading(false);
      } else {
        router.push("/signin");
        console.error("Error fetching profile:", result.error);
      }
    } else {
      console.log("Session not loaded or user ID undefined");
    }
  };

  const confirmBooking = async (payment_intent_id) => {
    const response = await fetch("/api/purchase/confirm-booking", {
      method: "POST",
      body: JSON.stringify({ payment_intent_id }),
    });
    if (response.status === 200) {
      setPurchase({ ...purchase, status: "booked" });
      toast.success("Booking confirmed!");
    }
  };

  const fetchPurchase = async () => {
    const userId = session?.data.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/purchase/${userId}`, {
        method: "GET",
        headers: {
          "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
        },
      });
      if (response.status !== 200) return;
      const result = await response.json();
      setPurchase(result.data);
      if (result.data.status === "pending") {
        if (searchParams.has("booking_confirmed")) {
          confirmBooking(result.data.payment_intent_id);
        } else {
          setBookInterview(true);
        }
      }
    } else {
      console.log("Session not loaded or user ID undefined");
    }
  };

  const handlePayment = async () => {
    if (!profileData.user_id) return;
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({ user_id: profileData.user_id }),
      });
      const result = await response.json();
      if (response.status !== 200) {
        throw Error("Something went wrong");
      }
      const stripe = await loadStripe(
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_LIVE_KEY
          : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_TEST_KEY
      );
      if (!stripe) {
        throw Error("Something went wrong");
      }
      console.log(result);
      await stripe.redirectToCheckout({ sessionId: result.session.id });
    } catch (error) {
      console.error(error);
    }
  };

  const requestEmailPermissions = async () => {
    const userId = session.data.session?.user.id;
    if (!userId) return;
    const response = await fetch("/api/oauth/request-permission", {
      method: "POST",
      headers: {
        "X-Supabase-Auth": session.data.session.access_token + " " + session.data.session.refresh_token,
      },
    });
    if (response.status === 200) {
      const { url } = await response.json();
      router.push(url);
    }
  };

  const fetchUser = async () => {
    const userId = session?.data?.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/user/${userId}`, {
        method: "GET",
      });
      if (response.status === 200) {
        const { user } = await response.json();
        fetchIndividual();
        fetchApplications();
      } else {
        router.push("/signup?complete-registration=true");
      }
    }
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <Loader />
        <Toaster />
      </>
    );
  }

  return (
    <main className="container mx-auto p-4 bg-[#1b1b29] rounded-lg shadow mt-8">
      {/* Profile Summary */}
      <section className="p-5 border-b border-gray-700">
        <div className="text-center">
          <h2 className="text-2xl font-bold">{`Welcome back, ${profileData.first_name}`}</h2>
        </div>
      </section>

      {/* Job Application Status */}
      <section className="p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white">Your Applications</h2>
          <div className="flex justify-center items-center gap-4">
            {purchase && purchase?.status !== "complete" && (
              <p className="mr-4">
                {`Booking Status: `}
                <span className="font-bold capitalize ">{purchase?.status}</span>
              </p>
            )}
            {!purchase && (
              <button
                onClick={handlePayment}
                className="text-left inline-block bg-purpleprimary text-white px-6 py-3 rounded hover:bg-purple-700 transition duration-150 ease-in-out"
              >
                Book Mock Interview
              </button>
            )}
            {bookInterview && (
              <Link
                target="_blank"
                href={"https://calendly.com/elostack/paid-interview"}
                className="text-left inline-block bg-purpleprimary text-white px-6 py-3 rounded hover:bg-purple-700 transition duration-150 ease-in-out"
              >
                Schedule Interview
              </Link>
            )}
            {false && (
              <button
                onClick={requestEmailPermissions}
                className="text-left inline-block bg-purpleprimary text-white px-6 py-3 rounded hover:bg-purple-700 transition duration-150 ease-in-out"
              >
                Grant Permissions
              </button>
            )}
          </div>
        </div>
      </section>
      <Toaster />
    </main>
  );
};

export default Page;
