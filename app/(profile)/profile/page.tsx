import ProfilePage from "@/components/Individual/profile/ProfilePage";
import NavBar from "@/components/NavBar";
const Profiles = () => {
  return (
    <main>
      <NavBar />
      <div className="flex h-screen">
        <ProfilePage />
      </div>
    </main>
  );
};

export default Profiles;
