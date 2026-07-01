import React from "react";
import { getBlogPosts, getBlogFeatured } from "@/lib/data";
import BlogsManager from "./blogs-manager";

export default async function Page() {
  const initialPosts = await getBlogPosts();
  const featuredPost = await getBlogFeatured();
  return <BlogsManager initialPosts={initialPosts} featuredPost={featuredPost} />;
}
