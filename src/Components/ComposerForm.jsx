import React, { useState } from "react";
import PostController from "../Controller/PostController.js";

const MAX_CHARS = 500;
const ADJECTIVES = ["Happy", "Cozy", "Sunny", "Breezy", "Fluffy"];
const NOUNS = ["Panda", "Sunflower", "Cloud", "Muffin", "Breeze"];
const EMOJIS = ["🐼", "🌻", "☁️", "🧁", "🍃"];

export default function ComposerForm({ onNewPost }) {
  const [draft, setDraft] = useState("");
  const [posting, setPosting] = useState(false);

  const getRandomAnon = () => {
    const i = Math.floor(Math.random() * ADJECTIVES.length);
    const j = Math.floor(Math.random() * NOUNS.length);
    return {
      name: `${ADJECTIVES[i]} ${NOUNS[j]}`,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    };
  };

  const handlePost = async () => {
    if (!draft.trim() || posting) return;

    setPosting(true);
    const anon = getRandomAnon();

    try {
      const newPost = await PostController.createPost({
        post_content: draft.trim(),
        author: anon.name,
        emojiProfile: anon.emoji,
      });

      onNewPost?.(newPost); // ✅ bubble new post up to SeasonalWalls
      setDraft("");
    } catch (err) {
      alert("Post failed. Check connection.");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-orange-100 p-5 shadow-sm">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-xl">
          🎭
        </div>
        <textarea
          className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm bg-orange-50 outline-none focus:bg-white transition-all"
          placeholder="Share anonymously..."
          value={draft}
          onChange={(e) =>
            e.target.value.length <= MAX_CHARS && setDraft(e.target.value)
          }
          rows={3}
        />
      </div>

      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-gray-300 font-semibold">
          {draft.length}/{MAX_CHARS}
        </span>
        <button
          onClick={handlePost}
          disabled={!draft.trim() || posting}
          className="bg-orange-400 hover:bg-orange-500 disabled:opacity-40 text-white text-sm font-bold px-6 py-2 rounded-full transition-all"
        >
          {posting ? "Sending..." : "Post"}
        </button>
      </div>
    </div>
  );
}
