"use client";

import { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const FormSchema = z
  .object({
    businessName: z
      .string()
      .max(100, "Business Name too long")
      .refine((value) => value !== "", "Please enter a Business Name"),
    email: z
      .string()
      .email("Please enter a valid email")
      .refine((value) => value !== "", "Email required"),
    password: z
      .string()
      .refine((value) => value !== "", "Password required")
      .refine((value) => value.length >= 8, "Password must be at least 8 characters"),
    confirmPassword: z.string().refine((value) => value !== "", "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignUpForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: "https://localhost:3000/",
        },
      });

      if (error) throw error;

      const response = await fetch("api/user/create", {
        method: "POST",
        body: JSON.stringify({
          name: values.businessName,
          email: values.email,
          userId: data.user.id,
          business: true,
        }),
      });

      if (response.status === 500) {
        const { error } = await response.json();
        throw error;
      }

      router.push("/");
    } catch (error) {
      console.error(error);
    }
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

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const unfilledFieldsCount = Object.keys(formErrors).length;
  const baseMarginTop = 29.5;
  const socialButtonsMarginTop = `${baseMarginTop + unfilledFieldsCount * 1}rem`;

  return (
    <div className="flex justify-center items-center h-full w-1/2 relative">
      <form
        onSubmit={handleSubmit}
        className="p-8  bg-gray-100  rounded-lg shadow max-w-md w-full xl:w-1/2 xl:-mt-40 relative"
        onSubmit={handleSubmit}
      >
        {/* businessName Input */}
        <div className="mb-5">
          <label htmlFor="businessName" className="block text-black text-sm font-bold mb-2">
            Business Name
          </label>
          <input
            type="text"
            name="businessName"
            id="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formErrors.businessName && <p className="text-red-500 text-xs italic">{formErrors.businessName}</p>}
        </div>

        {/* Email Input */}
        <div className="mb-5">
          <label htmlFor="email" className="block text-black text-sm font-bold mb-2">
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
          {formErrors.email && <p className="text-red-500 text-xs italic">{formErrors.email}</p>}
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-black text-sm font-bold mb-2">
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
          {formErrors.password && <p className="text-red-500 text-xs italic">{formErrors.password}</p>}
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            style={{ bottom: `${formErrors.password ? "-12px" : "-25px"}` }}
          >
            <Image
              src={showPassword ? "/Hide.svg" : "/Unhide.png"}
              alt="Toggle Password Visibility"
              width={25}
              height={30}
            />
          </button>
        </div>

        <div className="mb-4 relative">
          <label htmlFor="confirmPassword" className="block text-black text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formErrors.confirmPassword && <p className="text-red-500 text-xs italic">{formErrors.confirmPassword}</p>}
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            style={{
              bottom: `${formErrors.confirmPassword ? "-12px" : "-25px"}`,
            }}
          >
            <Image
              src={showConfirmPassword ? "/Hide.svg" : "/Unhide.png"}
              alt="Toggle Password Visibility"
              width={25}
              height={30}
            />
          </button>
        </div>

        <button
          type="submit"
          className="bg-blueprimary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Sign Up
        </button>
        <div className="flex items-center justify-center space-x-2 mt-4">
          <span className="text-black">Already have an account?</span>
          <a
            href="/signin"
            className="text-blueprimary hover:text-blue-900 font-bold focus:outline-none focus:shadow-outline"
          >
            Sign in
          </a>
        </div>
      </form>

      {/* Social Login Buttons with dynamic margin */}
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
  <button className="flex items-center p-4 text-black bg-gray-100 ml-8bg-iron rounded-lg shadow hover:bg-blue-400 w-full">
    <Image className="ml-4" src={logoPath} alt={`${service} Logo`} width={25} height={25} />
    <span className="ml-4">Create an account with {service}</span>
  </button>
);

export default SignUpForm;
