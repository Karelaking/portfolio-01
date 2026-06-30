import React from "react";

interface JsonLdProps {
  schema: Record<string, any>;
}

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Alex Gonzalez",
    "alternateName": "Alex Gonzalez Dev",
    "jobTitle": "Senior Software Engineer & Frontend Architect",
    "url": "https://alexgonzalez.dev",
    "image": "https://alexgonzalez.dev/developer_portrait.png",
    "sameAs": [
      "https://github.com",
      "https://linkedin.com",
      "https://x.com"
    ],
    "knowsAbout": [
      "Software Engineering",
      "Next.js",
      "React",
      "TypeScript",
      "Go",
      "Systems Architecture",
      "Design Systems",
      "Performance Optimization"
    ],
    "description": "Alex Gonzalez is a senior software engineer and designer specializing in building premium Next.js applications, scalable backend systems, and interactive interfaces."
  };
}

export function getBlogCollectionSchema(posts: Array<{ title: string; excerpt?: string; description?: string; date: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Writings on Engineering and Design | Alex Gonzalez",
    "description": "A collection of technical deep-dives on systems design, web engineering, and UX development.",
    "url": "https://alexgonzalez.dev/blogs",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": posts.map((post, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt || post.description || "",
          "datePublished": new Date(post.date).toISOString().split('T')[0],
          "author": {
            "@type": "Person",
            "name": "Alex Gonzalez"
          }
        }
      }))
    }
  };
}
