
import {
  FiUmbrella,
  FiMap,
  FiCoffee,
  FiCamera,
  FiCompass,
  FiAnchor,
} from "react-icons/fi";

/* ── Types ─────────────────────────────────────────────────────── */
interface Category {
  name: string;
  icon: React.ReactNode;
}

const CATEGORIES: Category[] = [
  { name: "Beach", icon: <FiUmbrella /> },
  { name: "Mountain", icon: <FiMap /> },
  { name: "City", icon: <FiCoffee /> },
  { name: "Wildlife", icon: <FiCamera /> },
  { name: "Adventure", icon: <FiCompass /> },
  { name: "Cruise", icon: <FiAnchor /> },
];

export function PopularCategories() {
  return (
    <section className="py-16 app-container">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-primary">
            Popular Categories
          </h2>
          <p className="text-secondary">Explore your favorite travel styles.</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              className="card-primary p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
            >
              <div className="text-2xl text-zinc-900 dark:text-zinc-50">
                {cat.icon}
              </div>
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
