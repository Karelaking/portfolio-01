"use client";
"use no memo";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StrokeDraw } from "@/components/stroke-draw";
import { RiSaveLine, RiRefreshLine, RiDeleteBin6Line, RiEdit2Line, RiCloseLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { updateBlogsAction } from "@/app/actions";
import { ImageSelector } from "@/components/image-selector";


type Author = {
  name: string;
  initials: string;
  img: number;
};

type PostItem = {
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  author: Author;
};

type BlogFormValues = {
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
};

export default function BlogsManager({ initialPosts, featuredPost }: { initialPosts: PostItem[], featuredPost: any }) {
  const router = useRouter();
  const [posts, setPosts] = useState<PostItem[]>(initialPosts);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const { register, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm<BlogFormValues>({
    defaultValues: {
      title: "",
      category: "",
      excerpt: "",
      date: "",
      readTime: "",
    }
  });

  const handleEdit = (index: number) => {
    const item = posts[index];
    setEditIndex(index);
    setValue("title", item.title);
    setValue("category", item.category);
    setValue("excerpt", item.excerpt);
    setValue("date", item.date);
    setValue("readTime", item.readTime);
    setImageUrl(item.image);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    reset();
    setImageUrl("");
  };

  const handleDelete = async (index: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    // If we delete the post currently being edited, cancel edit mode
    if (editIndex === index) {
      setEditIndex(null);
      reset();
      setImageUrl("");
    } else if (editIndex !== null && editIndex > index) {
      // Adjust edit index to prevent index mismatch
      setEditIndex(editIndex - 1);
    }

    const updated = posts.filter((_, idx) => idx !== index);
    setPosts(updated);

    try {
      const res = await updateBlogsAction(updated);
      if (res.success) {
        toast.success("Blog post deleted successfully!");
        router.refresh();
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete blog post.");
    }
  };

  const onSubmit = async (data: BlogFormValues) => {
    try {
      const submittedPost: PostItem = {
        title: data.title,
        category: data.category,
        excerpt: data.excerpt,
        date: data.date || "Jun 30, 2026",
        readTime: data.readTime || "5 min read",
        image: imageUrl || "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=800&q=80",
        author: {
          name: "Alex Gonzalez",
          initials: "AG",
          img: 15,
        }
      };

      let updated = [...posts];
      if (editIndex !== null) {
        updated[editIndex] = submittedPost;
      } else {
        updated = [submittedPost, ...updated];
      }

      const res = await updateBlogsAction(updated);
      if (res.success) {
        setPosts(updated);
        toast.success(editIndex !== null ? "Blog post updated successfully!" : "Blog post added successfully!");
        setEditIndex(null);
        reset();
        setImageUrl("");
        router.refresh();
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to save blog post.");
    }
  };


  return (
    <div className="flex flex-col gap-6 w-full md:h-[calc(100vh-120px)] md:lg:h-[calc(100vh-140px)] md:overflow-hidden animate-in fade-in duration-300">
      <div className="shrink-0">
        <h1 className="text-2xl font-bold tracking-tight">Blogs Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Add new blog posts and manage existing content in your public blogs feed.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 w-full md:flex-1 md:min-h-0 items-start md:items-stretch pb-6 md:pb-2 overflow-y-auto md:overflow-visible">
        {/* Left Column: Form (scrollable on desktop) */}
        <Card className="border border-border/80 bg-card/50 backdrop-blur-xs rounded-xl overflow-hidden flex flex-col md:h-full">
          <CardHeader className="border-b border-border/40 bg-muted/10 shrink-0">
            <CardTitle className="text-base font-bold">
              {editIndex !== null ? "Edit Blog Post" : "Add New Post"}
            </CardTitle>
            <CardDescription>
              {editIndex !== null ? "Modify the blog fields below to update existing details." : "Create a new blog entry to publish on your public website."}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 md:flex-1 md:overflow-y-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Post Title
                </label>
                <input
                  id="title"
                  placeholder="e.g. Scaling Next.js API Routes"
                  {...register("title", { required: true })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Category Tag (e.g. WEB DEV, ARCHITECTURE, NEXTJS)
                </label>
                <input
                  id="category"
                  placeholder="e.g. WEB DEV"
                  {...register("category", { required: true })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="excerpt" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Excerpt / Short Summary
                </label>
                <textarea
                  id="excerpt"
                  rows={3}
                  placeholder="Provide a short teaser or summary of the article..."
                  {...register("excerpt", { required: true })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50 resize-y"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="date" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Publish Date
                  </label>
                  <input
                    id="date"
                    placeholder="e.g. Jun 30, 2026"
                    {...register("date", { required: true })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="readTime" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Read Time (e.g. 5 min read)
                  </label>
                  <input
                    id="readTime"
                    placeholder="e.g. 5 min read"
                    {...register("readTime", { required: true })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                  />
                </div>
              </div>

              <ImageSelector
                value={imageUrl}
                onChange={setImageUrl}
                label="Post Cover Image"
                placeholderUrl="https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=800&q=80"
              />

              <Separator className="my-2" />

              <div className="flex items-center justify-end gap-3 pb-2">
                {editIndex !== null ? (
                  <>
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-xs gap-1.5 rounded-lg"
                      onClick={handleCancelEdit}
                      disabled={isSubmitting}
                    >
                      <StrokeDraw>
                        <RiCloseLine className="size-4" />
                      </StrokeDraw>
                      Cancel Edit
                    </Button>
                    <Button
                      type="submit"
                      className="text-xs gap-1.5 rounded-lg"
                      disabled={isSubmitting}
                    >
                      <StrokeDraw>
                        <RiSaveLine className="size-4" />
                      </StrokeDraw>
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-xs gap-1.5 rounded-lg"
                      onClick={() => { reset(); setImageUrl(""); }}
                      disabled={isSubmitting}
                    >
                      <StrokeDraw>
                        <RiRefreshLine className="size-4" />
                      </StrokeDraw>
                      Reset Form
                    </Button>
                    <Button
                      type="submit"
                      className="text-xs gap-1.5 rounded-lg"
                      disabled={isSubmitting}
                    >
                      <StrokeDraw>
                        <RiSaveLine className="size-4" />
                      </StrokeDraw>
                      {isSubmitting ? "Adding..." : "Add Post"}
                    </Button>
                  </>
                )}
              </div>

            </form>
          </CardContent>
        </Card>

        {/* Right Column: Existing Posts List (scrollable only on desktop) */}
        <Card className="border border-border/80 bg-card/50 backdrop-blur-xs rounded-xl overflow-hidden flex flex-col md:h-full">
          <CardHeader className="border-b border-border/40 bg-muted/10 shrink-0">
            <CardTitle className="text-base font-bold">Existing Blog Posts</CardTitle>
            <CardDescription>
              List of active blog posts rendered in the public feed.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 md:flex-1 md:overflow-y-auto">
            <div className="flex flex-col gap-3">
              {posts.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">No blog posts currently published.</p>
              ) : (
                posts.map((p, idx) => (
                  <div 
                    key={`${p.title}-${idx}`} 
                    className={`flex items-center justify-between border p-3.5 rounded-lg gap-4 transition-all duration-300 ${
                      editIndex === idx 
                        ? "border-primary/50 bg-primary/5 shadow-xs" 
                        : "border-border/80 bg-muted/10"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate text-foreground flex items-center gap-2">
                        {p.title}
                        {editIndex === idx && (
                          <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-primary/20 text-primary uppercase tracking-wider scale-90">
                            Editing
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-1">{p.category} • {p.date} • {p.readTime}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleEdit(idx)}
                        className={`p-1.5 transition-colors rounded-md ${
                          editIndex === idx 
                            ? "text-primary bg-primary/10 hover:bg-primary/20" 
                            : "text-muted-foreground hover:text-primary hover:bg-muted"
                        }`}
                        title="Edit Post"
                      >
                        <RiEdit2Line className="size-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(idx)}
                        className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-muted transition-colors rounded-md"
                        title="Delete Post"
                      >
                        <RiDeleteBin6Line className="size-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
