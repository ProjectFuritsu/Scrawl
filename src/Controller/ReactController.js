import { Supabase } from "../Service/SupabaseCon.js";

export default class ReactController {
  static async toggleReaction(postId, emoji, previousEmoji) {
    // Remove previous reaction if switching to a different one
    if (previousEmoji && previousEmoji !== emoji) {
      await Supabase.rpc("decrement_reaction", {
        p_post_id: postId,
        p_emoji: previousEmoji,
      });
    }

    // Same emoji clicked again = unreact (decrement)
    if (previousEmoji === emoji) {
      await Supabase.rpc("decrement_reaction", {
        p_post_id: postId,
        p_emoji: emoji,
      });
    } else {
      // New reaction = increment
      await Supabase.rpc("increment_reaction", {
        p_post_id: postId,
        p_emoji: emoji,
      });
    }
  }

  static async getReactions(postId) {
    const { data, error } = await Supabase
      .from("post_reactions")
      .select("react_desc, count")
      .eq("post_id", postId);

    if (error) throw new Error(error.message);
    return data;
  }
}