"use client";

import React, { useState } from "react";
import { FaPlane } from "react-icons/fa6";
import { FiPlus, FiMenu, FiX } from "react-icons/fi";
import { LogOut } from "lucide-react";
import { Avatar } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
    router.push("/");
  };

  const baseLinks = [
    { name: "Home", path: "/" },
    { name: "Explore Trips", path: "/explore-trips" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const navLinks = user
    ? [...baseLinks, { name: "Manage Trips", path: "/manage-trips" }]
    : baseLinks;

  // ইউজার নামের শর্টকাট জেনারেট করার জন্য হেল্পার (যেমন: Mishu Debnath -> MD)
  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="navbar-bg sticky top-0 z-50 w-full backdrop-blur-md ">
      <div className="app-container flex h-16 items-center justify-between">
        {/* Left: Logo Area */}
        <Link
          href="/"
          className="flex items-center gap-2 select-none cursor-pointer"
        >
          <span className="text-primary font-extrabold text-xl tracking-tight">
            NextJourney
          </span>
          <FaPlane className="logo-icon text-lg" />
        </Link>

        {/* Center: Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                prefetch={true}
                className={isActive ? "nav-item-active" : "nav-item"}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions Area */}
        <div className="hidden md:flex items-center gap-4">
          {isPending ? (
            <div className="w-8 h-8 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-full" />
          ) : user ? (
            <>
              <Link
                href="/add-trip"
                className="button-primary inline-flex items-center gap-2"
              >
                Add Trip
                <FiPlus size={16} />
              </Link>

              {/* ফিক্সড: HeroUI এর স্ট্রাকচার অনুযায়ী কম্পোনেন্ট ইমপ্লিমেন্ট করা হয়েছে */}
              <button
                type="button"
                className="outline-hidden cursor-pointer active:scale-95 transition-transform rounded-full ring-2 ring-zinc-100 hover:ring-[var(--primary)] p-0.5"
              >
                <Avatar className="w-8 h-8 cursor-pointer">
                  <Avatar.Image
                    alt={user?.name || "User Profile"}
                    src={
                      user?.image ||
                      "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
                    }
                  />
                  <Avatar.Fallback>{getInitials(user?.name)}</Avatar.Fallback>
                </Avatar>
              </button>

              <button
                type="button"
                onClick={handleSignOut}
                className="flex bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/40 text-red-600 h-9 px-4 rounded-xl font-bold text-sm items-center gap-1.5 cursor-pointer transition-colors border border-red-100 dark:border-red-900/30"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-bold transition-colors hover:opacity-80"
                style={{ color: "var(--primary)" }}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center h-9 px-4 rounded-xl font-bold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-sm cursor-pointer transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="flex md:hidden items-center gap-3">
          {user && (
            <div className="avatar-premium shadow-xs">
              {/* ফিক্সড: মোবাইল মেনুর ভেতরের Avatar-ও HeroUI স্ট্রাকচারে আপডেট করা হয়েছে */}
              <Avatar className="w-7 h-7 cursor-pointer">
                <Avatar.Image
                  alt={user?.name || "User Profile"}
                  src={
                    user?.image ||
                    "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
                  }
                />
                <Avatar.Fallback>{getInitials(user?.name)}</Avatar.Fallback>
              </Avatar>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="button-icon"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="mobile-drawer-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="mobile-drawer translate-x-0">
            <div className="flex items-center justify-between mb-8">
              <span className="text-primary font-bold text-lg">Menu</span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="button-icon"
                aria-label="Close menu"
              >
                <FiX size={18} />
              </button>
            </div>

            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={
                      isActive ? "mobile-nav-item-active" : "mobile-nav-item"
                    }
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col gap-4">
              {user ? (
                <>
                  <Link
                    href="/add-trip"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="button-primary w-full py-3 inline-flex items-center justify-center gap-2"
                  >
                    Add Trip
                    <FiPlus size={16} />
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full py-3 px-4 rounded-xl text-base font-bold text-red-600 hover:bg-red-50/60 dark:hover:bg-red-950/20 text-left transition-all duration-200 cursor-pointer flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-3 text-center rounded-xl font-bold border border-zinc-200 text-zinc-700 dark:text-zinc-300"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-3 text-center rounded-xl font-bold text-white"
                    style={{ backgroundColor: "var(--primary)" }}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
