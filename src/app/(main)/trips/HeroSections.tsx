import { FaPlane } from "react-icons/fa6";
import { FiChevronRight } from "react-icons/fi";
import Link from "next/link";

export default  function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "280px" }}
      aria-label="All Trips hero banner"
    >
      {/* Background gradient (nature/dark-mountains aesthetic) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #051C1A 0%, #0a2e28 35%, #0d3b34 60%, #072420 100%)",
        }}
      />

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
          radial-gradient(ellipse at 20% 50%, rgba(2,138,101,0.4) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(2,138,101,0.2) 0%, transparent 50%)
        `,
        }}
      />

      {/* Mountain silhouette SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full opacity-30"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,180 L0,80 L120,20 L260,90 L420,10 L580,70 L720,0 L880,60 L1040,15 L1200,75 L1360,30 L1440,55 L1440,180 Z"
          fill="rgba(2,138,101,0.25)"
        />
        <path
          d="M0,180 L0,120 L180,60 L360,130 L540,50 L700,100 L860,40 L1020,110 L1180,55 L1350,95 L1440,65 L1440,180 Z"
          fill="rgba(2,138,101,0.15)"
        />
      </svg>

      {/* Stars / dots pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
        aria-hidden="true"
      />

      {/* Airplane path illustration — right side */}
      <svg
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 opacity-20 hidden sm:block"
        width="220"
        height="160"
        viewBox="0 0 220 160"
        fill="none"
        aria-hidden="true"
      >
        {/* Dotted curved path */}
        <path
          d="M10,140 Q60,10 180,30"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth="1.5"
          strokeDasharray="6 5"
          fill="none"
        />
        {/* Small dots along path */}
        <circle cx="10" cy="140" r="3" fill="rgba(255,255,255,0.6)" />
        <circle cx="50" cy="90" r="2" fill="rgba(255,255,255,0.4)" />
        <circle cx="100" cy="50" r="2" fill="rgba(255,255,255,0.4)" />
        <circle cx="150" cy="35" r="2" fill="rgba(255,255,255,0.4)" />
        <circle cx="180" cy="30" r="3" fill="rgba(255,255,255,0.6)" />
        {/* Airplane icon at end */}
        <g transform="translate(168, 18) rotate(25)">
          <path d="M0,0 L12,5 L0,10 L3,5 Z" fill="rgba(255,255,255,0.9)" />
        </g>
      </svg>

      {/* Content */}
      <div className="relative z-10 app-container flex flex-col items-start justify-center py-16 gap-4">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1 text-xs text-white/60"
        >
          <Link
            href="/"
            className="hover:text-white/90 transition-colors font-medium"
          >
            Home
          </Link>
          <FiChevronRight className="text-white/40 text-xs" />
          <span className="text-white/90 font-semibold">Trips</span>
        </nav>

        {/* Title */}
        <div className="flex items-center gap-3">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight leading-none">
            All Trips
          </h1>
          <FaPlane
            className="text-white/30 text-2xl md:text-3xl transform rotate-[340deg] shrink-0"
            aria-hidden="true"
          />
        </div>

        {/* Subtitle */}
        <p className="text-white/60 text-sm md:text-base max-w-lg leading-relaxed">
          Discover handpicked adventures, hidden gems, and premium travel
          experiences crafted for every kind of explorer.
        </p>

        {/* Decorative pills */}
        <div
          className="flex items-center flex-wrap gap-2 mt-1"
          aria-hidden="true"
        >
          {["🏖️ Beach", "🏔️ Mountain", "🏙️ City", "🌿 Eco", "🦁 Wildlife"].map(
            (tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(4px)",
                }}
              >
                {tag}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
