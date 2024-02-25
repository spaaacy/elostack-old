import SignUpForm from "../../../components/business/registration/SignUpForm";
import Title from "../../../components/business/registration/Title";
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
