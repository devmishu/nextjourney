"use client";

import React, { useState } from "react";
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
} from "@heroui/react";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage(): React.JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const registerData = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    console.log("registerData.",registerData);
    const { name, email, password, image } = registerData;

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
    });

    setLoading(false);

    if (data) {
      toast.success("Account created successfully");
      router.push("/login");
    }

    if (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const googleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const githubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
    });
  };

  return (
    <div className="min-h-screen py-12 flex flex-col justify-center items-center main-bg">
      <div className="w-full max-w-[440px] section-bg border border-zinc-100 dark:border-zinc-800 rounded-[24px] p-8 md:p-10 shadow-xs mx-auto">
        {/* Header Titles */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary tracking-tight">
            Create Account
          </h2>
          <p className="text-xs font-medium text-secondary mt-1">
            Join NextJourney today
          </p>
        </div>

        {/* Social Registration Buttons */}
        <div className="flex flex-col gap-3 mb-5">
          <button
            onClick={googleSignIn}
            type="button"
            className="w-full h-11 button-outline flex items-center justify-center gap-2.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
          >
            <FcGoogle className="w-4 h-4" />
            <span>Continue with Google</span>
          </button>

          <button
            onClick={githubSignIn}
            type="button"
            className="w-full h-11 button-outline flex items-center justify-center gap-2.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
          >
            <FaGithub className="w-4 h-4 text-zinc-900 dark:text-white" />
            <span>Continue with GitHub</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-100 dark:border-zinc-800"></div>
          </div>
          <span className="relative px-3 section-bg text-xs font-semibold text-secondary uppercase tracking-wider">
            or
          </span>
        </div>

        {/* HeroUI Type-safe Form Component */}
        <Form className="flex flex-col gap-5 w-full" onSubmit={onSubmit}>
          {/* Full Name Field */}
          <TextField
            isRequired
            name="name"
            type="text"
            className="w-full"
            isDisabled={loading}
          >
            <Label className="text-xs font-bold text-primary mb-1.5 block text-left">
              Full Name
            </Label>
            <Input
              placeholder="Enter your name"
              className="w-full h-11 input-primary px-3.5 text-sm font-medium placeholder:text-zinc-400 dark:placeholder:text-zinc-600 transition-all"
            />
            <FieldError className="text-xs text-red-500 font-medium mt-1 text-left" />
          </TextField>

          {/* Profile Image URL Field */}
          <TextField
            isRequired
            name="image"
            type="url"
            className="w-full"
            isDisabled={loading}
          >
            <Label className="text-xs font-bold text-primary mb-1.5 block text-left">
              Profile Image URL
            </Label>
            <Input
              placeholder="https://example.com/avatar.jpg"
              className="w-full h-11 input-primary px-3.5 text-sm font-medium placeholder:text-zinc-400 dark:placeholder:text-zinc-600 transition-all"
            />
            <FieldError className="text-xs text-red-500 font-medium mt-1 text-left" />
          </TextField>

          {/* Email Field with Validation */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full"
            isDisabled={loading}
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-xs font-bold text-primary mb-1.5 block text-left">
              Email
            </Label>
            <Input
              placeholder="Enter your email"
              className="w-full h-11 input-primary px-3.5 text-sm font-medium placeholder:text-zinc-400 dark:placeholder:text-zinc-600 transition-all"
            />
            <FieldError className="text-xs text-red-500 font-medium mt-1 text-left" />
          </TextField>

          {/* Password Field with Validation */}
          <TextField
            isRequired
            name="password"
            type="password"
            className="w-full"
            isDisabled={loading}
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              return null;
            }}
          >
            <Label className="text-xs font-bold text-primary mb-1.5 block text-left">
              Password
            </Label>
            <Input
              placeholder="Create a password"
              className="w-full h-11 input-primary px-3.5 text-sm font-medium placeholder:text-zinc-400 dark:placeholder:text-zinc-600 transition-all"
            />
            <FieldError className="text-xs text-red-500 font-medium mt-1 text-left" />
          </TextField>

          {/* Register Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 button-primary mt-2 flex items-center justify-center text-sm font-bold rounded-xl shadow-xs transition-transform active:scale-98 cursor-pointer"
            isDisabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </Button>
        </Form>

        {/* Bottom Redirect Link */}
        <div className="text-center mt-6">
          <p className="text-xs font-semibold text-secondary">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-xs font-bold hover:underline transition-all text-[#028A65]"
            >
              LogIn
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
