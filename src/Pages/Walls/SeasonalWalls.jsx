import { useEffect, useState } from "react";
import ComposerForm from "../../Components/ComposerForm";
import PostController from "../../Controller/PostController";
import ReactController from "../../Controller/ReactController";
import HelmetComponent from "../../Components/SEO/HelmetComponent";

const REACTIONS = [
  { emoji: "🤍", label: "felt this" },
  { emoji: "🫂", label: "big hug" },
  { emoji: "✨", label: "same here" },
  { emoji: "💛", label: "sending love" },
];

const DEFAULT_REACTIONS = {
  "🤍": 0,
  "🫂": 0,
  "✨": 0,
  "💛": 0,
};

function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function totalReactions(reactions) {
  return Object.values(reactions).reduce((sum, c) => sum + c, 0);
}

function mapPost(row) {
  // Build reactions from joined post_reactions
  const reactions = { ...DEFAULT_REACTIONS };
  (row.post_reactions ?? []).forEach(({ react_desc, count }) => {
    if (react_desc in reactions) reactions[react_desc] = count;
  });

  // Restore what this browser previously reacted with
  const userReaction = localStorage.getItem(`reaction_${row.post_id}`) ?? null;

  return {
    id: row.post_id,
    content: row.post_content,
    timestamp: row.created_at,
    anon: {
      name: row.author ?? "Anonymous",
      emoji: row.emojiProfile ?? "🎭",
    },
    reactions,
    userReaction,
  };
}

export default function SeasonalWalls() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    PostController.getPosts()
      .then((rows) => {
        // Clean up stale reaction keys for deleted posts
        const validIds = new Set(rows.map((r) => String(r.post_id)));
        Object.keys(localStorage)
          .filter((key) => key.startsWith("reaction_"))
          .filter((key) => !validIds.has(key.replace("reaction_", "")))
          .forEach((key) => localStorage.removeItem(key));

        setPosts(rows.map(mapPost));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleReaction = async (postId, emoji) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    const previousEmoji = post.userReaction;
    const alreadyReacted = previousEmoji === emoji;

    // Update localStorage
    if (alreadyReacted) {
      localStorage.removeItem(`reaction_${postId}`);
    } else {
      localStorage.setItem(`reaction_${postId}`, emoji);
    }

    // Optimistic UI update
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          userReaction: alreadyReacted ? null : emoji,
          reactions: {
            ...p.reactions,
            ...(previousEmoji && !alreadyReacted
              ? { [previousEmoji]: Math.max(0, p.reactions[previousEmoji] - 1) }
              : {}),
            [emoji]: alreadyReacted
              ? Math.max(0, p.reactions[emoji] - 1)
              : p.reactions[emoji] + 1,
          },
        };
      }),
    );

    // Persist to DB in background
    try {
      await ReactController.toggleReaction(postId, emoji, previousEmoji);
    } catch (err) {
      console.error("Reaction sync failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50">
      <HelmetComponent
        title="The Wall"
        description="Post your thoughts anonymously on the Scrawl wall."
      />

      <main className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">
        {/* Composer */}
        <ComposerForm
          onNewPost={(row) => setPosts((prev) => [mapPost(row), ...prev])}
        />

        {/* States */}
        {loading && (
          <p className="text-center text-sm text-gray-400 py-10">
            Loading posts...
          </p>
        )}
        {error && (
          <p className="text-center text-sm text-red-400 py-10">
            Failed to load posts: {error}
          </p>
        )}

        {/* Posts */}
        {!loading &&
          !error &&
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5 group transition-all hover:shadow-md hover:border-orange-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-lg shrink-0">
                  {post.anon.emoji}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-700">
                    {post.anon.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {timeAgo(post.timestamp)}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {post.content}
              </p>

              <div className="border-t border-orange-50 pt-3 flex flex-col gap-2">
                {totalReactions(post.reactions) > 0 && (
                  <p className="text-xs text-gray-400">
                    {Object.entries(post.reactions)
                      .filter(([, c]) => c > 0)
                      .slice(0, 3)
                      .map(([e]) => e)
                      .join("")}{" "}
                    {totalReactions(post.reactions)}
                  </p>
                )}
                <div className="flex gap-2 flex-wrap">
                  {REACTIONS.map(({ emoji, label }) => (
                    <button
                      key={emoji}
                      onClick={() => handleReaction(post.id, emoji)}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all
                        ${
                          post.userReaction === emoji
                            ? "bg-orange-100 border-orange-300 text-orange-500"
                            : "bg-gray-50 border-gray-200 text-gray-400 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-400"
                        }`}
                    >
                      <span>{emoji}</span>
                      <span className="hidden sm:inline">{label}</span>
                      {post.reactions[emoji] > 0 && (
                        <span className="font-bold">
                          {post.reactions[emoji]}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </main>
    </div>
  );
}
