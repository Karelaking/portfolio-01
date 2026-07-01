"use client";
"use no memo";

import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StrokeDraw } from "@/components/stroke-draw";
import { RiSaveLine, RiRefreshLine, RiAddLine, RiEdit2Line, RiDeleteBin6Line, RiCloseLine } from "@remixicon/react";
import BlogList from "@/components/blog-list";
import { useRouter } from "next/navigation";
import { updateBlogsAction } from "@/app/actions";

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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const { register, handleSubmit, reset, watch, setValue, formState: { isSubmitting } } = useForm<BlogFormValues>({
    defaultValues: {
      title: "",
      category: "",
      excerpt: "",
      date: "",
      readTime: "",
    }
  });

  const title = watch("title");
  const category = watch("category");
  const excerpt = watch("excerpt");
  const date = watch("date");
  const readTime = watch("readTime");

  const previewPosts = isEditing
    ? posts.map((p, idx) =>
        idx === editIndex
          ? {
              ...p,
              title: title || p.title,
              category: category || p.category,
              excerpt: excerpt || p.excerpt,
              date: date || p.date,
              readTime: readTime || p.readTime,
            }
          : p
      )
    : title
    ? [
        {
          title,
          category,
          excerpt,
          date: date || "Jun 30, 2026",
          readTime: readTime || "5 min read",
          image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=800&q=80",
          author: {
            name: "Alex Gonzalez",
            initials: "AG",
            img: 15,
          }
        },
        ...posts
      ]
    : posts;

  const handleEdit = (index: number) => {
    const item = posts[index];
    setEditIndex(index);
    setIsEditing(true);
    setValue("title", item.title);
    setValue("category", item.category);
    setValue("excerpt", item.excerpt);
    setValue("date", item.date);
    setValue("readTime", item.readTime);
  };

  const handleDelete = async (index: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
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
        image: editIndex !== null && posts[editIndex] ? posts[editIndex].image : "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=800&q=80",
        author: {
          name: "Alex Gonzalez",
          initials: "AG",
          img: 15,
        }
      };

      let updated = [...posts];
      if (isEditing && editIndex !== null) {
        updated[editIndex] = submittedPost;
      } else {
        updated = [submittedPost, ...updated];
      }

      const res = await updateBlogsAction(updated);
      if (res.success) {
        setPosts(updated);
        toast.success(isEditing ? "Blog post updated successfully!" : "Blog post added successfully!");
        setIsEditing(false);
        setEditIndex(null);
        reset();
        router.refresh();
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to save changes.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditIndex(null);
    reset();
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        setScale(width / 1024);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blogs Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your technical writing archive, categories, and article features.
          </p>
        </div>
        {!isEditing && (
          <Button
            onClick={() => {
              setIsEditing(true);
              setEditIndex(null);
              reset();
            }}
            className="w-fit text-xs gap-1.5 rounded-lg shrink-0"
          >
            <RiAddLine className="size-4" />
            Add New Post
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-5 w-full items-start">
        {/* Left Column: Form Editor or Items List (40% width) */}
        <Card className="lg:col-span-2 border border-border/80 bg-card/50 backdrop-blur-xs rounded-xl overflow-hidden">
          <CardHeader className="border-b border-border/40 bg-muted/10">
            <CardTitle className="text-base font-bold">
              {isEditing ? (editIndex !== null ? "Edit Post" : "Add Post") : "Technical Articles"}
            </CardTitle>
            <CardDescription>
              {isEditing ? "Fill in fields to save changes." : "Articles currently featured in your blog page archive."}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="title" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Article Title
                  </label>
                  <input
                    id="title"
                    {...register("title", { required: true })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="category" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Category Tag (e.g. Engineering, Architecture)
                  </label>
                  <input
                    id="category"
                    {...register("category", { required: true })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="excerpt" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Excerpt / Short Abstract
                  </label>
                  <textarea
                    id="excerpt"
                    rows={4}
                    {...register("excerpt", { required: true })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50 resize-y"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="date" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Publish Date (e.g. Jun 28, 2026)
                    </label>
                    <input
                      id="date"
                      {...register("date", { required: true })}
                      className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="readTime" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Read Duration (e.g. 5 min read)
                    </label>
                    <input
                      id="readTime"
                      {...register("readTime", { required: true })}
                      className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                    />
                  </div>
                </div>

                <Separator className="my-2" />

                <div className="flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-xs gap-1.5 rounded-lg"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    <StrokeDraw>
                      <RiCloseLine className="size-4" />
                    </StrokeDraw>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="text-xs gap-1.5 rounded-lg"
                    disabled={isSubmitting}
                  >
                    <StrokeDraw>
                      <RiSaveLine className="size-4" />
                    </StrokeDraw>
                    {isSubmitting ? "Saving..." : "Save Article"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-3">
                {posts.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">No blog posts found.</p>
                ) : (
                  posts.map((p, idx) => (
                    <div key={`${p.title}-${idx}`} className="flex items-center justify-between border border-border/80 bg-muted/10 p-3.5 rounded-lg gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-bold truncate text-foreground">{p.title}</p>
                        <p className="text-xs text-muted-foreground truncate mt-1">{p.category} • {p.date}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleEdit(idx)}
                          className="p-1.5 hover:text-primary transition-colors hover:bg-muted rounded-md"
                          title="Edit"
                        >
                          <RiEdit2Line className="size-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(idx)}
                          className="p-1.5 hover:text-destructive transition-colors hover:bg-muted rounded-md"
                          title="Delete"
                        >
                          <RiDeleteBin6Line className="size-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column: Live Mockup Preview of Actual Page (3/5 width) */}
        <Card className="lg:col-span-3 border border-border/80 bg-card/50 backdrop-blur-xs rounded-xl overflow-hidden sticky top-6">
          <CardHeader className="pb-3 border-b border-border/40 bg-muted/20">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
              Actual Page Preview (Desktop Viewport)
            </CardTitle>
          </CardHeader>
          <CardContent ref={containerRef} className="p-0 overflow-y-auto max-h-[550px] relative bg-background flex flex-col justify-start items-center">
            {/* Scale wrapper dynamically adjusted to container width */}
            <div 
              className="shrink-0 w-full"
              style={{
                width: "1024px",
                transform: `scale(${scale})`,
                transformOrigin: "top center",
                paddingBottom: `calc(100% * (1 - ${scale}))`,
              }}
            >
              <div className="py-16">
                <BlogList posts={previewPosts} categories={["All"]} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
