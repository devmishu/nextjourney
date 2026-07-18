"use client";

import React, { useState } from "react";
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
  Link,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage(): React.JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("demo@gmail.com");
  const [password, setPassword] = useState<string>("Demouser123");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    setLoading(false);

    if (data) {
      toast.success("Login successfully");
      router.push("/");
    }
    if (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center main-bg">
      <div className="w-full max-w-[440px] section-bg border border-zinc-100 dark:border-zinc-800 rounded-[24px] p-8 md:p-10 shadow-xs mx-auto">
        {/* Header Titles */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs font-medium text-secondary mt-1">
            Login to your account
          </p>
        </div>

        {/* HeroUI Type-safe Form Component */}
        <Form
          className="flex flex-col gap-5 w-full"
          onSubmit={onSubmit}
          autoComplete="off"
        >
          {/* Email Field with Validation */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full"
            isDisabled={loading}
            value={email}
            onChange={(value) => setEmail(value)}
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
              autoComplete="new-password"
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
            value={password}
            onChange={(value) => setPassword(value)}
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
              placeholder="Enter your password"
              autoComplete="new-password"
              className="w-full h-11 input-primary px-3.5 text-sm font-medium placeholder:text-zinc-400 dark:placeholder:text-zinc-600 transition-all"
            />
            <FieldError className="text-xs text-red-500 font-medium mt-1 text-left" />
          </TextField>

          {/* Login Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 button-primary mt-2 flex items-center justify-center text-sm font-bold rounded-xl shadow-xs transition-transform active:scale-98 cursor-pointer"
            isDisabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>

        {/* Bottom Redirect Link */}
        <div className="text-center mt-6">
          <p className="text-xs font-semibold text-secondary">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-xs font-bold hover:underline transition-all text-[#028A65]"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
