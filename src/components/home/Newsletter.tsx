"use client";

import React, { useState } from "react";
import { FiMail } from "react-icons/fi";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSent(true);
    }
  };

  return (
    <section className=" py-16 md:py-24 transition-colors duration-300">
      <div className="app-container">
        <div className="card-primary p-8 md:p-12 text-center flex flex-col items-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
            <FiMail className="w-8 h-8" />
          </div>

          {/* Text */}
          <h2 className="text-3xl font-black text-primary mb-4 tracking-tight">
            Subscribe to our Newsletter
          </h2>
          <p className="text-secondary max-w-md mx-auto mb-8">
            Stay updated with the latest travel tips, destinations, and
            exclusive offers delivered to your inbox.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              disabled={isSent}
              required
              className="input-primary w-full flex-1"
            />
            <button
              type="submit"
              disabled={isSent}
              className="button-submit-auth whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSent ? "Subscribed!" : "Subscribe Now"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
