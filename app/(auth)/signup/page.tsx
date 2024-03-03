import SignUpForm from "../../../components/Individual/registration/SignUpForm";

import NavBar from "@/components/common/NavBar";
const SignUpPage = () => (
  <>
    <NavBar />
    <main className="flex  h-[90vh]">
      <SignUpForm />
    </main>
  </>
);

export default SignUpPage;
