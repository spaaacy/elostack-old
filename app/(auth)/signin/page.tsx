import SignInForm from "../../../components/Individual/registration/SignInForm";
import NavBar from "@/components/NavBar";
const SignInPage = () => (
  <>
    <NavBar />
    <div className="flex h-[90vh]">
      <SignInForm />
    </div>
  </>
);

export default SignInPage;
