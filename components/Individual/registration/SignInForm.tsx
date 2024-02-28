"use client";
import { useState } from "react";
import { z } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
const SignInForm = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const result = FormSchema.safeParse(formData);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      // Only take the first error message for each field
      for (let field in errors) {
        errors[field] = errors[field][0];
      }
      setFormErrors(errors);
    } else {
      console.log("Form submission successful", formData);
      setFormErrors({});
      onSubmit(result.data); // Call onSubmit with the valid form data
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const unfilledFieldsCount = Object.keys(formErrors).length;
  const baseMarginTop = 19;
  const socialButtonsMarginTop = `${
    baseMarginTop + unfilledFieldsCount * 1.1
  }rem`;

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
    <div className="flex justify-center items-center h-full w-full md:w-1/2 relative">
      <form
        className="p-8 bg-gray-100 rounded-lg shadow max-w-md w-full xl:w-1/2 xl:-mt-40 relative"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-black text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formErrors.email && (
            <p className="text-red-500 text-xs italic">{formErrors.email}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-black text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formErrors.password && (
            <p className="text-red-500 text-xs italic">{formErrors.password}</p>
          )}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-black"
            style={{ top: formErrors.password ? "0.9rem" : "1.9rem" }}
          >
            {showPassword ? (
              <Image
                src="/Hide.svg"
                alt="Hide password"
                width={25}
                height={25}
              />
            ) : (
              <Image
                src="/Unhide.png"
                alt="Show password"
                width={25}
                height={25}
              />
            )}
          </button>
        </div>

        <button
          type="submit"
          className="bg-blueprimary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Sign In
        </button>
        <div className="flex items-center justify-center space-x-2 mt-4">
          <span className="text-black">Don&apos;t have an account?</span>
          <a
            href="/signup"
            className="text-blue-500 hover:text-blue-900 font-bold focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </a>
        </div>
      </form>
      <div
        className="absolute"
        style={{
          marginTop: socialButtonsMarginTop,
          marginRight: "0rem",
          width: "28rem",
        }}
      >
        <div className="flex flex-col items-center gap-3">
          <SocialLoginButton service="Google" logoPath="/google.svg" />
          <SocialLoginButton service="GitHub" logoPath="/github.svg" />
        </div>
      </div>
    </div>
  );
};

const SocialLoginButton = ({ service, logoPath }) => (
  <button className="flex items-center p-4 text-black bg-gray-100 rounded-lg shadow hover:bg-blue-400 w-full">
    <img
      className="ml-4"
      src={logoPath}
      alt={`${service} Logo`}
      width={25}
      height={25}
    />
    <span className="ml-4">Sign in with {service}</span>
  </button>
);

export default SignInForm;
