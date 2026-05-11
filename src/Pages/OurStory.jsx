import { Link } from "react-router";

const steps = [
  {
    emoji: "✍️",
    title: "Write Anonymously",
    desc: "Type whatever's on your mind — feelings, thoughts, confessions, or just a little something to brighten someone's day. No name, no account, just your words.",
  },
  {
    emoji: "🧱",
    title: "It Goes on the Wall",
    desc: "Your post appears on the public wall instantly. Everyone can read it, but nobody knows it came from you. Pure and simple.",
  },
  {
    emoji: "🤍",
    title: "People React",
    desc: "Visitors can react with a 🤍 felt this, 🫂 big hug, ✨ same here, or 💛 sending love. No comments, no replies — just gentle acknowledgment.",
  },
  {
    emoji: "🌸",
    title: "Seasonal Boards",
    desc: "Special walls open up around holidays — Valentine's, Christmas, Halloween, and more. Posts on seasonal boards vanish forever when the season ends.",
  },
  {
    emoji: "💨",
    title: "Here Today, Gone Tomorrow",
    desc: "Seasonal posts disappear when the board closes. The main wall keeps flowing. Nothing is permanent — just like a real wall out in the world.",
  },
];

const values = [
  { emoji: "🫶", title: "Kindness first", desc: "Every feature is built around making people feel heard, not judged." },
  { emoji: "🎭", title: "True anonymity", desc: "No accounts, no tracking, no way to trace a post back to you." },
  { emoji: "🌈", title: "Safe space", desc: "Basic content filters and rate limiting keep the wall warm and welcoming." },
  { emoji: "✨", title: "Impermanence", desc: "Seasonal posts fade away — a reminder that feelings pass too." },
];

export default function OurStory() {
  return (
    <div className="min-h-screen bg-orange-50">

      {/* Hero */}
      <section className="max-w-2xl mx-auto px-4 pt-16 pb-12 text-center">
        <div className="text-6xl mb-5">🖍️</div>
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight leading-tight mb-4">
          A wall for every feeling.
        </h1>
        <p className="text-gray-500 text-base leading-relaxed max-w-md mx-auto">
          Scrawl is an anonymous public wall where you can post your thoughts, feelings, and little moments — freely, safely, and without judgment.
        </p>
        <Link
          to="/wall"
          className="inline-block mt-8 bg-orange-400 hover:bg-orange-500 text-white text-sm font-bold px-7 py-3 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          🧱 Visit The Wall
        </Link>
      </section>

      {/* Divider */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="border-t border-orange-100" />
      </div>

      {/* Our Story */}
      <section className="max-w-2xl mx-auto px-4 py-14">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">📖</span>
          <h2 className="text-2xl font-extrabold text-gray-800">Our Story</h2>
        </div>
        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-7 space-y-4 text-gray-600 text-sm leading-relaxed">
          <p>
            Scrawl started with a simple question: <span className="font-semibold text-gray-700">what if there was a place where you could say anything — without worrying about what people think of you?</span>
          </p>
          <p>
            We've all had moments where we just needed to get something off our chest. A crush we never confessed. A hard week we got through alone. A small joy we wanted to share but didn't know how. Social media makes everything feel permanent and performative. Scrawl is the opposite of that.
          </p>
          <p>
            Think of it like a corkboard in a cozy café, or a brick wall covered in chalk messages from strangers. Nobody signs their name. Everyone belongs. It's messy, honest, and human.
          </p>
          <p>
            We built Scrawl because the world needs more spaces where you can just <span className="font-semibold text-gray-700">be</span> — without an audience, without a follower count, without pressure.
          </p>
        </div>
      </section>

      {/* Purpose */}
      <section className="max-w-2xl mx-auto px-4 pb-14">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🎯</span>
          <h2 className="text-2xl font-extrabold text-gray-800">Our Purpose</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {values.map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5 flex flex-col gap-2 hover:border-orange-200 hover:shadow-md transition-all"
            >
              <span className="text-3xl">{emoji}</span>
              <h3 className="font-extrabold text-gray-700 text-sm">{title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-2xl mx-auto px-4 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">⚙️</span>
          <h2 className="text-2xl font-extrabold text-gray-800">How it Works</h2>
        </div>
        <div className="flex flex-col gap-4">
          {steps.map(({ emoji, title, desc }, i) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5 flex gap-4 items-start hover:border-orange-200 hover:shadow-md transition-all"
            >
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div className="w-10 h-10 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-xl">
                  {emoji}
                </div>
                <span className="text-xs font-bold text-orange-300">0{i + 1}</span>
              </div>
              <div>
                <h3 className="font-extrabold text-gray-700 text-sm mb-1">{title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border-t border-orange-100 py-14 text-center px-4">
        <div className="text-4xl mb-4">🌟</div>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Ready to scrawl something?</h2>
        <p className="text-gray-400 text-sm mb-7 max-w-xs mx-auto">
          No sign up. No judgment. Just your words on the wall.
        </p>
        <Link
          to="/wall"
          className="inline-block bg-orange-400 hover:bg-orange-500 text-white text-sm font-bold px-8 py-3 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          🧱 Go to The Wall
        </Link>
      </section>

    </div>
  );
}