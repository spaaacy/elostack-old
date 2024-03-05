"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { useContext, useEffect, useState } from "react";
import NavBar from "@/components/common/NavBar";
import { UserContext } from "@/context/UserContext";
import Loader from "@/components/common/Loader";
import Image from "next/image";
const Page = () => {
  const { session } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (session?.data?.session) {
      router.push("/dashboard");
    } else if (session) {
      setLoading(false);
    }
  }, [session]);

  if (loading)
    return (
      <>
        <NavBar />
        <Loader />
      </>
    );

  const FormSchema = z.object({
    email: z
      .string()
      .email("Please enter a valid email")
      .refine((value) => value !== "", "Email required"),
    password: z
      .string()
      .refine((value) => value !== "", "Password required")
      .refine((value) => value.length >= 8, "Password must be at least 8 characters"),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = FormSchema.safeParse(formData);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      for (let field in errors) {
        errors[field] = errors[field][0];
      }
      setFormErrors(errors);
    } else {
      console.log("Form submission successful", formData);
      setFormErrors({});
      onSubmit(result.data);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values) => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (data.user && data.session) {
      router.push("/");
    } else {
      console.log(error);
    }
  };
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signIn({
      provider: 'google'
    });
  
    if (error) console.log(error);
  };
  return (
    <>
      <NavBar />
      <div className="flex h-[90vh]">
        <main className="flex flex-col flex-1 bg-gray-100 min-h-screen bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
          <Head>
            <title>Sign In | EloStack</title>
          </Head>

          <main className="container mx-auto p-8 bg-white rounded-lg shadow-md mt-20 flex justify-center items-center">
            <section className="grid md:grid-cols-2 gap-4">
              <div className="p-8 text-center md:text-left border-r border-gray-200 flex flex-col items-center">
                <h2 className="text-4xl font-bold mb-4 text-blueprimary">EloStack</h2>
                <p className="text-md text-gray-500 text-center">
                  Join EloStack and streamline your hiring process. Find top talent, conduct efficient technical
                  interviews, and hire with confidence. We help individuals get matched with top companies, showcase
                  their skills, and ace their interviews.
                </p>
              </div>

              <div className="p-8">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-6">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-gray-700 text-sm font-bold mb-2">
                Password:
              </label>
              <Link href="/forgot-password" className="text-blue-500 hover:text-blue-800 text-sm">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <button type="button" onClick={togglePasswordVisibility} className="text-gray-500">
                  {showPassword ? (
                    <Image src="/Hide.svg" alt="Hide password" width={25} height={25} />
                  ) : (
                    <Image src="/Unhide.png" alt="Show password" width={25} height={25} />
                  )}
                </button>
              </div>
            </div>
          </div>
          <button
  type="button"
  className="flex items-center justify-start shadow-lg bg-gray-100 mb-6 hover:bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
>
  <Image src="/google.svg" alt="Google logo" width={23} height={23} className="ml-4" />
  <span className="ml-4">Sign In with Google</span>
</button>
                  <div className="flex items-center justify-between">
                    <Link href="/signup" className="inline-block align-baseline font-bold text-sm ">
                      Don't Have an Account?
                      <span className="ml-2 text-blue-500 hover:text-blue-800">Sign Up</span>
                    </Link>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </main>
        </main>
      </div>
    </>
  );
};

export default Page;
