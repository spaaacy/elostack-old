"use client";
import NavBar from "@/components/common/NavBar";
import BusinessDashboard from "@/components/business/BusinessDashboard";
import IndividualDashboard from "@/components/individual/IndividualDashboard";
import Loader from "@/components/common/Loader";
import { UserContext } from "@/context/UserContext";
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { session, verifyLogin } = useContext(UserContext);
  const [user, setUser] = useState();
  const [hasPermission, setHasPermission] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const success = await verifyLogin();
      if (success) {
        await fetchUser();
      }
    };

    if (session) {
      loadData();
    }
  }, [session]);

  const fetchUser = async () => {
    const userId = session?.data?.session?.user.id;
    if (userId) {
      const response = await fetch(`/api/user/${userId}`, {
        method: "GET",
      });
      if (response.status === 200) {
        const { user } = await response.json();
        setUser(user);
        checkPermission(user);
      } else {
        router.push("/signup?complete-registration=true");
      }
    }
  };

  const checkPermission = (user) => {
    // Check if the user has granted the necessary permissions
    const hasGrantedPermission = user.hasGrantedPermission; // Assuming there is a property in the user object indicating permission status
    setHasPermission(hasGrantedPermission);

    if (!hasGrantedPermission) {
      router.push("/emailing"); // Redirect to the emailing page if permission is not granted
    }
  };

  return (
    <main className="flex flex-1 flex-col">
      <NavBar />
      {user ? (
        <div className="flex flex-1">
          {hasPermission ? (
            user.business ? (
              <BusinessDashboard />
            ) : (
              <IndividualDashboard user={user} />
            )
          ) : (
            <Loader /> // Show loader while checking permission
          )}
        </div>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default Page;