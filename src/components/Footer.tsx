import Link from "next/link";
import {
  FiShield,
  FiPhoneCall,
  FiGlobe,
  FiStar,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiFacebook,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";
import { FaPlaneDeparture } from "react-icons/fa";
import { RiVisaLine, RiMastercardFill, RiPaypalFill } from "react-icons/ri";
import { SiAmericanexpress } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 transition-colors duration-200">
      {/* ─── Top Value Features Bar ─── */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100/80 dark:border-zinc-900">
          {/* Feature 1 */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100 shrink-0 shadow-xs">
              <FiShield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Trusted & Secure
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Your information is safe with us.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100 shrink-0 shadow-xs">
              <FiPhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                24/7 Support
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                We're here whenever you need.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100 shrink-0 shadow-xs">
              <FiGlobe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Global Service
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Helping travelers around the world.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100 shrink-0 shadow-xs">
              <FiStar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Best Experience
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                We make your journey better.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Footer Links & Info ─── */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Brand Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-100"
            >
              <span>NextJourney</span>
              <FaPlaneDeparture className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
            </Link>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-sm">
              Discover amazing places, plan your perfect trips, and create
              memories that last a lifetime.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3 pt-2">
              {[
                {
                  icon: <FiLinkedin />,
                  href: "https://www.linkedin.com/in/mishudeb",
                },
                { icon: <FiGithub />, href: "https://github.com/devmishu" },
                {
                  icon: <FiFacebook />,
                  href: "https://www.facebook.com/devmishunath",
                },
              ].map((social, i) => (
                <a
                  target="blanck"
                  key={i}
                  href={social.href}
                  className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900 flex items-center justify-center text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1: Explore (2 Cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <div>
              <h5 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Explore
              </h5>
              <div className="w-6 h-[2px] bg-zinc-900 dark:bg-zinc-100 mt-1 rounded-full" />
            </div>
            <ul className="space-y-2 text-xs font-medium">
              {[
                { name: "Home", path: "/" },
                { name: "Trips", path: "/trips" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Analyze Buget", path: "/analyze-buget" },
                { name: "Add Trip", path: "/add-trip" },
                { name: "My Trip", path: "/my-trips" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <div>
              <h5 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Contact Us
              </h5>
              <div className="w-6 h-[2px] bg-zinc-900 dark:bg-zinc-100 mt-1 rounded-full" />
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
              <li className="flex items-start gap-2">
                <FiMail className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <span className="truncate">support@nextjourney.com</span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>+880 1234 567890</span>
              </li>
              <li className="flex items-start gap-2">
                <FiMapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <span>House 12, Road 5, Dhanmondi Dhaka 1205, Bangladesh</span>
              </li>
              <li className="flex items-start gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-900">
                <FiClock className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <span>Sun - Thu (10:00 AM - 8:00 PM)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ─── Bottom Copyright & Gateway Cards ─── */}
      <div className="border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/10 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <p>
            © {currentYear}{" "}
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">
              NextJourney
            </span>
            . All rights reserved.
          </p>

          {/* Payment Gateways */}
          <div className="flex items-center gap-2">
            {[
              <RiVisaLine key="visa" className="w-8 h-5" />,
              <RiMastercardFill
                key="master"
                className="w-8 h-5 text-amber-600"
              />,
              <SiAmericanexpress
                key="amex"
                className="w-7 h-4 text-blue-600"
              />,
              <RiPaypalFill key="paypal" className="w-8 h-5 text-blue-800" />,
            ].map((gateway, idx) => (
              <div
                key={idx}
                className="h-7 px-2 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded flex items-center justify-center shadow-xs"
              >
                {gateway}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
