"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const FormSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email")
    .refine((value) => value !== "", "Email required"),
  password: z
    .string()
    .refine((value) => value !== "", "Password required")
    .refine(
      (value) => value.length >= 8,
      "Password must be at least 8 characters"
    ),
});

const Signup: React.FC = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isBusiness, setIsBusiness] = useState(false);
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

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
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

  return (
    <main className="flex flex-col flex-1 bg-gray-100 min-h-screen bg-no-repeat bg-fixed bg-bottom bg-[url('/waves.svg')]">
      <Head>
        <title>
          {isBusiness ? "Business Signup" : "Individual Signup"} | EloStack
        </title>
      </Head>

      <main className="container mx-auto p-8 bg-white rounded-lg shadow-md mt-20 flex justify-center items-center">
        <section className="grid md:grid-cols-2 gap-4">
          <div className="p-8 text-center md:text-left border-r border-gray-200 flex flex-col items-center">
            <h2 className="text-4xl font-bold mb-4 text-blueprimary">
              EloStack
            </h2>
            <p className="text-md text-gray-500 text-center">
              {isBusiness
                ? "Join EloStack and streamline your hiring process. Find top talent, conduct efficient technical interviews, and hire with confidence."
                : "Join EloStack and find your next job. Get matched with top companies, showcase your skills, and ace your interviews."}
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="text-gray-700 text-sm font-bold mb-2"
                  >
                    Password:
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-blue-500 hover:text-blue-800 text-sm"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <Link
                  href="/business/sign-up"
                  className="inline-block align-baseline font-bold text-sm "
                >
                  Don't Have an Account?
                  <span className="ml-2 text-blue-500 hover:text-blue-800">
                    Sign Up
                  </span>
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
  );
};

export default Signup;
