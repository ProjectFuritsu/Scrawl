import { Supabase } from "../Service/SupabaseCon.js";

export default class PostController {
  static async createPost(fields) {
    const { data, error } = await Supabase.from("posts")
      .insert([fields])
      .select();

    if (error) throw new Error(error.message);
    return data[0];
  }

  static async getPosts() {

    await Supabase.rpc("delete_old_posts");

    const { data, error } = await Supabase.from("posts")
      .select("*, post_reactions(react_desc, count)")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }
}
