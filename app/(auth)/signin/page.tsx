import SignInForm from "../../../components/Individual/registration/SignInForm";
import Title from "../../../components/Individual/registration/Title";
import NavBar from "@/components/NavBar";
const SignInPage = () => (
  <>
    <NavBar />
    <div className="flex h-[90vh]">
      <Title />
      <SignInForm />
    </div>
  </>
);

export default SignInPage;
