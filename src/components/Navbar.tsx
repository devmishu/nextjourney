"use client";

import React, { useState } from "react";
import { FaPlane } from "react-icons/fa6";
import { FiPlus, FiMenu, FiX } from "react-icons/fi";
import { Avatar } from "@heroui/react";

export function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    "Home",
    "Trips",
    "Destinations",
    "About Us",
    "Blog",
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar-bg sticky top-0 z-50 w-full">
      <div className="app-container flex h-16 items-center justify-between">
        {/* Left: Logo Area */}
        <div className="flex items-center gap-2 select-none">
          <span className="text-primary font-extrabold text-xl tracking-tight">
            NextJourney
          </span>
          <FaPlane className="logo-icon text-lg" />
        </div>

        {/* Center: Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navigationItems.map((item) => {
            const isActive = activeTab === item;
            return (
              <button
                key={item}
                onClick={() => handleTabClick(item)}
                className={isActive ? "nav-item-active" : "nav-item"}
              >
                {item}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions Area */}
        <div className="hidden md:flex items-center gap-4">
          <button className="button-primary">
            Add Trip
            <FiPlus size={16} />
          </button>

          <div className="avatar-premium shadow-xs">
            <Avatar
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
              name="User Profile"
              className="w-8 h-8 cursor-pointer"
            />
          </div>
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="flex md:hidden items-center gap-3">
          <div className="avatar-premium shadow-xs">
            <Avatar
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
              name="User Profile"
              className="w-7 h-7 cursor-pointer"
            />
          </div>

          <button
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
                onClick={() => setIsMobileMenuOpen(false)}
                className="button-icon"
                aria-label="Close menu"
              >
                <FiX size={18} />
              </button>
            </div>

            <nav className="flex flex-col gap-6">
              {navigationItems.map((item) => {
                const isActive = activeTab === item;
                return (
                  <button
                    key={item}
                    onClick={() => handleTabClick(item)}
                    className={isActive ? "mobile-nav-item-active" : "mobile-nav-item"}
                  >
                    {item}
                  </button>
                );
              })}
            </nav>

            <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800/80">
              <button className="button-primary w-full py-3">
                Add Trip
                <FiPlus size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
