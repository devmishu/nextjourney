"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiHome,
  FiChevronRight,
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiBookOpen,
  FiMessageSquare,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";
import { Input, TextArea, Button } from "@heroui/react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitted) return;

    // Trigger toast alert and lock the form
    setShowToast(true);
    setIsSubmitted(true);

    // Auto-hide toast after 4 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 relative">
      {/* ─── Premium Minimal Notification Toast ─── */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xl border border-zinc-800 dark:border-zinc-200 animate-in fade-in slide-in-from-top-4 duration-300">
          <FiCheckCircle className="text-emerald-500 dark:text-emerald-600 w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs font-bold">Message Sent Successfully</span>
            <span className="text-[10px] opacity-80 mt-0.5">
              We will get back to you shortly.
            </span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* ─── Breadcrumb Navigation ─── */}
        <nav className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-8 select-none">
          <Link
            href="/"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1"
          >
            <FiHome className="text-sm" />
          </Link>
          <FiChevronRight className="text-zinc-300 dark:text-zinc-700" />
          <span className="text-zinc-900 dark:text-zinc-300 font-semibold">
            Contact Us
          </span>
        </nav>

        {/* ─── Main Two-Column Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* ─── Left Column: Info & Details ─── */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100/40 dark:border-emerald-900/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              We're here to help
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
                Contact Us
              </h1>
              <p className="text-sm font-medium leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-md">
                Have any questions, feedback, or collaboration ideas? We'd love
                to hear from you. Our team is always ready to help you plan your
                next journey.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-2 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shrink-0">
                  <FiMail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
                    Email Us
                  </h4>
                  <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed max-w-xs">
                    support@nextjourney.com
                  </p>
                  <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed max-w-xs">
                    We usually reply within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-2 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shrink-0">
                  <FiPhone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
                    Call Us
                  </h4>
                  <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed max-w-xs">
                    +880 1234 567890
                  </p>
                  <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed max-w-xs">
                    Sun - Thu (10:00 AM - 8:00 PM)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-2 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shrink-0">
                  <FiMapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
                    Office Address
                  </h4>
                  <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed max-w-xs">
                    House 12, Road 5, Dhanmondi <br />
                    Dhaka 1205, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Right Column: Contact Form Card ─── */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/60 shadow-xs space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
                  Send Us a Message
                </h3>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                  Fill out the form and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Width Stack Elements */}
                <div className="w-full flex flex-col gap-4">
                  {/* Name Field */}
                  <div className="w-full flex flex-col gap-1.5">
                    <label className="w-full text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      Your Name
                    </label>
                    <Input
                      disabled={isSubmitted}
                      type="text"
                      placeholder="Enter your name"
                      variant="bordered"
                      radius="xl"
                      startContent={
                        <FiUser className="text-zinc-400 text-sm shrink-0" />
                      }
                      classNames={{
                        inputWrapper:
                          "border-zinc-200 dark:border-zinc-800 bg-transparent h-11 w-full",
                      }}
                    />
                  </div>

                  {/* Email Field */}
                  <div className="w-full flex flex-col gap-1.5">
                    <label className="w-full text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      Your Email
                    </label>
                    <Input
                      disabled={isSubmitted}
                      type="email"
                      placeholder="Enter your email"
                      variant="bordered"
                      radius="xl"
                      startContent={
                        <FiMail className="text-zinc-400 text-sm shrink-0" />
                      }
                      classNames={{
                        inputWrapper:
                          "border-zinc-200 dark:border-zinc-800 bg-transparent h-11 w-full",
                      }}
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div className="w-full flex flex-col gap-1.5">
                  <label className="w-full text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    Subject
                  </label>
                  <Input
                    disabled={isSubmitted}
                    type="text"
                    placeholder="Enter subject"
                    variant="bordered"
                    radius="xl"
                    startContent={
                      <FiBookOpen className="text-zinc-400 text-sm shrink-0" />
                    }
                    classNames={{
                      inputWrapper:
                        "border-zinc-200 dark:border-zinc-800 bg-transparent h-11 w-full",
                    }}
                  />
                </div>

                {/* Message Field */}
                <div className="w-full flex flex-col gap-1.5">
                  <label className="w-full text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    Your Message
                  </label>
                  <div className="relative w-full">
                    <TextArea
                      fullWidth
                      disabled={isSubmitted}
                      placeholder="Write your message here..."
                      variant="bordered"
                      radius="xl"
                      rows={5}
                      minRows={5}
                      startContent={
                        <FiMessageSquare className="text-zinc-400 text-sm shrink-0 mt-0.5" />
                      }
                      classNames={{
                        base: "w-full", // এটি পুরো কম্পোনেন্টটিকে ফুল উইডথ করবে
                        inputWrapper:
                          "border-zinc-200 dark:border-zinc-800 bg-transparent py-3 w-full",
                      }}
                    />
                    <span className="absolute right-4 bottom-3 text-[10px] font-medium text-zinc-400 dark:text-zinc-500 tabular-nums select-none z-10">
                      0/1000
                    </span>
                  </div>
                </div>

                {/* Dynamic Action Button */}
                <div className="pt-2 w-full">
                  <Button
                    disabled={isSubmitted}
                    type="submit"
                    radius="xl"
                    className={`w-full h-12 text-sm font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                      isSubmitted
                        ? "bg-zinc-200 text-zinc-400 border border-zinc-300 dark:bg-zinc-800 dark:text-zinc-600 dark:border-zinc-700 cursor-not-allowed"
                        : "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 cursor-pointer shadow-md"
                    }`}
                  >
                    <FiSend className="text-sm" />
                    <span>{isSubmitted ? "Message Sent" : "Send Message"}</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
