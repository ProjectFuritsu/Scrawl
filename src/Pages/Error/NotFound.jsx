import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="mt-24 bg-orange-50 flex flex-col items-center justify-center px-4 text-center">

      {/* Big doodle */}
      <div className="text-8xl mb-6 animate-bounce">🖍️</div>

      {/* 404 */}
      <h1 className="text-8xl font-extrabold text-orange-200 tracking-tight leading-none select-none">
        404
      </h1>

      {/* Message */}
      <h2 className="text-2xl font-extrabold text-gray-700 mt-4 mb-2">
        Oops! This wall doesn't exist.
      </h2>
      <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
        Looks like someone scrawled the wrong address. The page you're looking for has either been erased or never existed.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-10">
        <Link
          to="/wall"
          className="bg-orange-400 hover:bg-orange-500 text-white text-sm font-bold px-6 py-3 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          🏠 Back to The Wall
        </Link>
      </div>

      {/* Fun footnote */}
      <p className="text-xs text-gray-300 my-10">
        Maybe write about it on the wall? 😄
      </p>

    </div>
  );
}