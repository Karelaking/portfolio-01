import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
} from "@/components/ui/card";
import { RiArrowRightLine, RiTimeLine } from "@remixicon/react";
import BlogList from "@/components/blog-list";
import { getBlogFeatured, getBlogCategories, getBlogPosts } from "@/lib/data";

export default async function BlogBlock() {
  const featured = await getBlogFeatured();
  const categories = await getBlogCategories();
  const posts = await getBlogPosts();

  return (
    <section className="flex min-h-svh w-full items-center justify-center bg-background py-20 text-foreground">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Writings
          </span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl capitalize">
            Notes on engineering and design
          </h2>
          <p className="mt-3 text-base text-muted-foreground px-4 sm:px-24">
            A collection of technical articles, deep dives, and thoughts on building modern software architectures and design systems.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mt-14 w-full">
          <Card className="flex flex-col md:flex-row overflow-hidden border border-border bg-card p-0 transition-colors duration-150 hover:bg-muted/40">
            <div className="w-full md:w-1/2 relative min-h-[300px]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <Badge variant="outline" className="w-fit mb-4">
                {featured.category}
              </Badge>
              <h3 className="text-2xl font-bold tracking-tight mb-3">
                {featured.title}
              </h3>
              <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                {featured.excerpt}
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <Avatar className="size-10 border border-border">
                  <AvatarImage
                    src={`https://i.pravatar.cc/150?img=${featured.author.img}`}
                    alt={featured.author.name}
                    className="grayscale object-cover"
                  />
                  <AvatarFallback className="text-xs font-medium">
                    {featured.author.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    {featured.author.name}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{featured.date}</span>
                    <span>&middot;</span>
                    <span className="flex items-center gap-1">
                      <RiTimeLine className="size-3" />
                      {featured.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <BlogList posts={posts} categories={categories} />

        <div className="mt-16 flex justify-center">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Load More Articles
            <RiArrowRightLine data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </section>
  );
}
