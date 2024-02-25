import SignInForm from "../../../components/business/registration/SignInForm";
import Title from "../../../components/business/registration/Title";
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
