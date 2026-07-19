"use client";

import React, { useState, useEffect } from "react";
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
  const [mounted, setMounted] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;

 
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
    router.push("/");
  };

  const baseLinks = [
    { name: "Home", path: "/" },
    { name: "Trips", path: "/trips" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Analyze Budget", path: "/analyze-buget" },
  ];

  const navLinks = user
    ? [...baseLinks, { name: "My Trips", path: "/my-trips" }]
    : baseLinks;

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
    <>
      {/* Main Header Container */}
      <header className="navbar-bg sticky top-0 z-50 w-full backdrop-blur-md border-b border-zinc-100 dark:border-zinc-900/50">
        <div className="app-container flex h-16 items-center justify-between">
          {/* Left: Logo Area */}
          <Link
            href="/"
            className="flex items-center gap-2 select-none cursor-pointer group"
          >
            <span className="text-zinc-900 dark:text-zinc-50 font-extrabold text-xl tracking-tight transition-colors">
              NextJourney
            </span>
            <FaPlane className="logo-icon text-lg text-[#028A65] transition-transform group-hover:translate-x-0.5" />
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

          {/* Right: Actions Area (Desktop) */}
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

                <button
                  type="button"
                  className="outline-hidden cursor-pointer active:scale-95 transition-transform rounded-full ring-2 ring-zinc-100 dark:ring-zinc-800 hover:ring-[#028A65] p-0.5"
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
                  style={{ color: "#028A65" }}
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
      </header>

      
      {mounted && isMobileMenuOpen && (
        <>
          {/* Overlay Behind Drawer */}
          <div
            className="fixed inset-0 z-100 bg-black/60 backdrop-blur-xs transition-opacity duration-300 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Solid Isolated Side Drawer */}
          <div className="fixed top-0 right-0 bottom-0 z-[101] w-[80%] max-w-sm bg-white dark:bg-[#09090b] p-6 flex flex-col gap-6 shadow-2xl transition-transform duration-300 ease-in-out border-l border-zinc-100 dark:border-zinc-900 md:hidden pb-24">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-900">
              <span className="text-zinc-900 dark:text-zinc-50 font-extrabold text-lg tracking-tight">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Navigation Menu Links */}
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-emerald-50 dark:bg-emerald-950/20 text-[#028A65] dark:text-emerald-400 font-bold border-l-2 border-[#028A65]"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Drawer Bottom Actions Footer */}
            <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-900 flex flex-col gap-4">
              {user ? (
                <>
                  <Link
                    href="/add-trip"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-3 bg-[#028A65] hover:bg-[#027354] text-white rounded-xl font-bold text-center text-sm transition-colors shadow-xs"
                  >
                    Add Trip
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full py-3 px-3 text-red-600 dark:text-red-400 font-bold text-sm text-left flex items-center gap-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
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
                    className="w-full py-3 text-center rounded-xl font-bold border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-3 text-center rounded-xl font-bold text-white bg-[#028A65] hover:bg-[#027354] text-sm transition-colors shadow-xs"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
