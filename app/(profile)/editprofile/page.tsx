<<<<<<< Updated upstream
import AccountPage from "@/components/Individual/profile/EditProfilePage";
import NavBar from "@/components/NavBar";
const Accounts = () => (
  <>
    <NavBar />
    <div className="flex h-screen">
      <AccountPage />
    </div>
=======
<<<<<<<< Updated upstream:app/(profile)/account/page.tsx
import Account from "@/components/Individual/profile/account";
========
import AccountPage from "@/components/Individual/profile/EditProfile";
>>>>>>>> Stashed changes:app/(profile)/editprofile/page.tsx
import NavBar from "@/components/NavBar";
const Accounts = () => (
    <>
    <NavBar />
  <div className="flex h-screen">

    <Account />
  </div>
>>>>>>> Stashed changes
  </>
);

export default Accounts;
