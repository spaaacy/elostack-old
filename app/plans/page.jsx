"use client";

import NavBar from "@/components/common/NavBar";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { faHandshake, faUsers, faBuilding } from "@fortawesome/free-solid-svg-icons";

const pricingPlans = [
  {
    id: 1,
    name: "EloStack Basic",
    price: 500,
    description: "Perfect for individual users",
    features: ["First 5 interview on-the-house", "10 interviews", "Feature 3"],
    theme: "orange",
    amount: 10,
    icon: faHandshake,
    image: "/handshake.png",
  },
  {
    id: 2,
    name: "EloStack Premium",
    price: 1250,
    description: "Ideal for small teams",
    features: ["First 5 interview on-the-house", "25 Interviews", "Feature 3"],
    theme: "blue",
    amount: 25,
    icon: faUsers,
    image: "/people.png",
  },
  {
    id: 3,
    name: "EloStack Enterprise",
    price: 2500,
    description: "Best for large organizations",
    features: ["First 5 interview on-the-house", "50 Interviews", "Feature 3"],
    theme: "dark-blue",
    amount: 50,
    icon: faBuilding,
    image: "/skyline.png",
  },
];

const themeClasses = {
  orange: {
    bg: "bg-orange-500",
    hoverBg: "hover:bg-orange-700",
  },
  blue: {
    bg: "bg-blue-500",
    hoverBg: "hover:bg-blue-700",
  },
  "dark-blue": {
    bg: "bg-blue-900",
    hoverBg: "hover:bg-blue-700",
  },
};

const Page = () => {
  const { session } = useContext(UserContext);
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      fetchUser();
    }
  }, [session]);

  const purchasePackage = async (amount) => {
    if (user && user.business && amount > 0) {
      const response = await fetch("/api/user/purchase-credits", {
        method: "POST",
        body: JSON.stringify({
          user_id: user.user_id,
          amount,
        }),
      });
      if (response.status === 200) {
      }
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
        setUser(user);
      }
    }
  };

  const handlePurchase = async (amount) => {
    if (user?.business && amount) {
      await purchasePackage(amount);
      router.push("/dashboard");
    } else if (session?.data?.session) {
      console.log("You must be a business to purchase credits");
    } else {
      router.push("/signin");
    }
  };

  return (
    <main>
      <NavBar />
      <div className="flex h-screen">
        <main className="flex flex-col flex-1 bg-gray-100 min-h-screen bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
          <Head>
            <title>Pricing | EloStack</title>
          </Head>
          <div className="container mx-auto p-4 mt-10">
            <div className="container mx-auto p-4 bg-white rounded-lg shadow mt-0 h-[44rem]">
              <section className="text-center p-5">
                <h2 className="text-4xl font-bold text-blue-600">Choose Your Plan</h2>
                <p className="text-gray-600 mt-2">Choose a plan that fits your needs best</p>
              </section>
              <section className="flex justify-center items-stretch flex-wrap gap-2 mt-8 h-[28rem]">
                {pricingPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`m-4 w-80 flex flex-col relative -mt-4 bg-white rounded-lg shadow-xl p-5 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 h-full`}
                  >
                    <div
                      className={`absolute top-0 left-0 w-full h-4 rounded-t-lg ${themeClasses[plan.theme].bg}`}
                    ></div>
                    <div className="flex justify-center my-4">
                      <Image src={plan.image} alt={plan.name} width={50} height={50} />
                    </div>
                    <h3 className="text-3xl font-bold text-center text-gray-900 my-4">{plan.name}</h3>
                    <p className="text-center text-gray-600">{plan.description}</p>
                    <h4 className="text-2xl font-bold text-center text-gray-900 my-2">${plan.price}</h4>
                    <ul className="flex-grow">
                      {plan.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center border-t border-gray-200 pt-2 text-gray-600 mb-2 mt-3"
                        >
                          <div className="flex items-center mr-2">
                            <Image src="/checked.png" alt="Checked" width={16} height={16} />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {/* <button
                      onClick={() => handlePurchase(plan.amount)}
                      className={`${themeClasses[plan.theme].bg} text-white mt-4 py-2 px-4 rounded ${
                        themeClasses[plan.theme].hoverBg
                      } hover:text-white transition duration-150 ease-in-out`}
                    >
                      Purchase
                    </button> */}
                  </div>
                ))}
              </section>
            </div>
          </div>
        </main>
      </div>
    </main>
  );
};

export default Page;
