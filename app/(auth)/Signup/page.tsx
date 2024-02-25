import SignUpForm from "../../../components/Individual/registration/SignUpForm";
import Title from "../../../components/Individual/registration/Title";
import NavBar from "@/components/NavBar";
const SignUpPage = () => (
  <>
    <NavBar />
    <main className="flex  h-[90vh]">
      <Title />
      <SignUpForm />
    </main>
  </>
);

export default SignUpPage;
