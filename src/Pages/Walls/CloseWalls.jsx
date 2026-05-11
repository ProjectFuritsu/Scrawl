import { Link } from "react-router";
import HelmetComponent from "../../Components/SEO/HelmetComponent";

export default function CloseWalls({
  board = { label: "This Wall", emoji: "🧱" },
}) {
  return (
    <div className="mt-28 bg-orange-50 flex flex-col items-center justify-center px-4 text-center">
      <HelmetComponent
        title="Wall Not Open"
        description="This wall is not currently open for posting."
      />

      {/* Icon */}
      <div className="text-7xl mb-4">🔒</div>

      {/* Board name */}
      <div className="inline-flex items-center gap-2 bg-white border border-orange-100 rounded-full px-4 py-1.5 text-sm font-bold text-orange-400 shadow-sm mb-6">
        <span>{board.emoji}</span>
        <span>{board.label}</span>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-3">
        This wall isn't open yet.
      </h1>
      <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
        The admin hasn't opened this board for posting yet. Check back soon —
        something special is being prepared for you. 🌟
      </p>

      {/* Divider doodle */}
      <div className="flex items-center gap-2 my-8 select-none text-orange-200 text-lg">
        <span>✏️</span>
        <span className="tracking-widest font-black text-orange-100 text-2xl">
          - - - - -
        </span>
        <span>✏️</span>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/wall"
          className="bg-orange-400 hover:bg-orange-500 text-white text-sm font-bold px-6 py-3 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          🧱 Go to The Classic Wall
        </Link>
      </div>

      {/* Footnote */}
      <p className="text-xs text-gray-300 mt-10">
        Want to be notified when it opens? Check back here closer to the season!
        🗓️
      </p>
    </div>
  );
}
