import {
  RiDiscordFill,
  RiFigmaFill,
  RiGithubFill,
  RiGoogleFill,
  RiNotionFill,
  RiSlackFill,
  RiSupabaseFill,
  RiVercelFill,
  RiTerminalBoxLine,
  RiDatabase2Line,
  RiToolsLine,
  RiReactjsLine,
  RiJavascriptLine,
  RiTailwindCssFill,
  RiNodejsLine,
  RiTerminalWindowLine,
  RiGithubLine,
  RiUbuntuLine,
  RiCloudWindyLine,
  RiCpuLine,
  RiLayout3Line,
  RiRocketLine,
  RiServerLine,
  RiExchangeBoxLine,
  RiLayoutMasonryLine,
  RiMagicLine,
  RiSmartphoneLine,
  RiHardDrive2Line,
  RiShieldKeyholeLine,
} from "@remixicon/react";

export const logos = [
  { name: "React / Next.js", Icon: RiVercelFill },
  { name: "GitHub / CI-CD", Icon: RiGithubFill },
  { name: "Supabase / DB", Icon: RiSupabaseFill },
  { name: "Figma UI/UX", Icon: RiFigmaFill },
  { name: "Slack Collaboration", Icon: RiSlackFill },
  { name: "Notion Docs", Icon: RiNotionFill },
  { name: "Google Cloud", Icon: RiGoogleFill },
  { name: "Discord Support", Icon: RiDiscordFill },
];

export const faqs = [
  {
    q: "What is your primary technology stack?",
    a: "I specialize in TypeScript, React, Next.js, and Node.js for frontend and full-stack development, combined with Go and Python for high-performance backend microservices and data pipelines.",
  },
  {
    q: "Do you work with remote teams and agencies?",
    a: "Yes, absolutely. I have worked with distributed teams across Europe and the US, adapting seamlessly to agile workflows, async communication, and tight development sprints.",
  },
  {
    q: "What is your approach to code quality and testing?",
    a: "I follow DRY and SOLID design principles, maintain a clean repository structure, write comprehensive unit and integration tests, and utilize CI/CD workflows to ensure stable, production-ready deployments.",
  },
  {
    q: "How do we collaborate on a new project?",
    a: "We start with a discovery call to align on technical requirements and design specs. I then outline a clear implementation roadmap, set up staging previews, and maintain full transparency through regular demo sessions.",
  },
  {
    q: "Are you open to full-time opportunities or contract roles?",
    a: "I am open to contract engagements, freelance consultancies, and select full-time roles where I can build impactful products with passionate teams.",
  },
];

export const members = [
  {
    name: "Clara Hoffmann",
    role: "Co-founder & CEO",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "Shapes strategy and culture. Previously founded two B2B SaaS companies and led growth at Stripe.",
    social: { linkedin: "#", twitter: "#", github: null },
  },
  {
    name: "Marcus Tran",
    role: "Co-founder & CTO",
    avatar: "https://i.pravatar.cc/150?img=12",
    bio: "Architect behind the platform. Open-source contributor with a decade of distributed-systems experience.",
    social: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    name: "Amara Osei",
    role: "Head of Design",
    avatar: "https://i.pravatar.cc/150?img=49",
    bio: "Crafts interfaces that feel inevitable. Former principal designer at Figma and Linear.",
    social: { linkedin: "#", twitter: "#", github: null },
  },
  {
    name: "Lena Kovač",
    role: "VP of Engineering",
    avatar: "https://i.pravatar.cc/150?img=24",
    bio: "Scales teams and codebases with equal care. Led engineering at three Series B startups.",
    social: { linkedin: "#", twitter: null, github: "#" },
  },
  {
    name: "Daniel Reyes",
    role: "Head of Product",
    avatar: "https://i.pravatar.cc/150?img=33",
    bio: "Turns customer problems into elegant solutions. Background in product management at Notion and Vercel.",
    social: { linkedin: "#", twitter: "#", github: null },
  },
  {
    name: "Yuna Park",
    role: "Head of Marketing",
    avatar: "https://i.pravatar.cc/150?img=44",
    bio: "Builds brand from zero to recognizable. Previously ran marketing at Loom through their acquisition by Atlassian.",
    social: { linkedin: "#", twitter: "#", github: null },
  },
];

export const timelineJobs = [
  {
    role: "Senior Software Engineer",
    company: "Stripe",
    period: "2024 - Present",
    location: "Berlin, Germany (Remote)",
    description:
      "Led the migration of billing pipelines to a serverless gRPC architecture, reducing batch transaction latency by 42%. Collaborated with design and product teams to launch new checkout portals using Next.js and Tailwind CSS.",
    tags: ["Go", "TypeScript", "React", "gRPC", "PostgreSQL", "AWS"],
    image: {
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      width: 600,
      height: 450,
      alt: "Stripe billing analytics dashboard interface",
    },
  },
  {
    role: "Full Stack Developer",
    company: "Linear",
    period: "2022 - 2024",
    location: "Berlin, Germany (Hybrid)",
    description:
      "Designed and implemented real-time offline sync protocols for high-speed client interfaces. Built highly reusable components for the internal design system, focusing on keyboard navigation and accessibility standards (WCAG).",
    tags: ["React", "TypeScript", "Node.js", "GraphQL", "WebSockets", "CSS Modules"],
    image: {
      url: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
      width: 600,
      height: 450,
      alt: "Developer workspace showing code editor and Linear configurations",
    },
  },
  {
    role: "Frontend Engineer",
    company: "Vercel",
    period: "2020 - 2022",
    location: "Remote",
    description:
      "Contributed to Next.js core features, focusing on image optimization and middleware rendering paths. Supported enterprise clients in optimizing codebases to achieve perfect Lighthouse Core Web Vital scores.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Webpack", "Edge Functions"],
    image: {
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      width: 600,
      height: 450,
      alt: "Rendering performance chart analytics and Lighthouse checks",
    },
  },
];

export const projects = [
  {
    title: "Next.js Production Boilerplate",
    description:
      "A complete Next.js starter kit with built-in authentication, database integration (PostgreSQL via Supabase), email workflows, and pre-configured CI/CD deployment scripts.",
    tag: "Fullstack",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "GitHub Actions"],
    github: "https://github.com",
    demo: "https://nextjs.org",
    image: {
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      width: 600,
      height: 450,
      alt: "Next.js dashboard web application interface",
    },
  },
  {
    title: "Rust Dev-Proxy CLI",
    description:
      "A blazing fast Rust-based command-line tool designed to configure local proxy setups and port routing automatically, accelerating environment setups for microservice architectures.",
    tag: "CLI Tool",
    tags: ["Rust", "CLI", "Docker", "Networking"],
    github: "https://github.com",
    demo: null,
    image: {
      url: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
      width: 600,
      height: 450,
      alt: "Developer workspace showing code IDE and CLI outputs",
    },
  },
  {
    title: "Go API Gateway",
    description:
      "A lightweight, high-performance API gateway built in Go, featuring automated rate-limiting, JWT authentication validation, CORS management, and Prometheus metrics tracking.",
    tag: "Backend",
    tags: ["Go", "Redis", "Prometheus", "Docker", "gRPC"],
    github: "https://github.com",
    demo: "https://go.dev",
    image: {
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      width: 600,
      height: 450,
      alt: "Go API gateway server analytics logs",
    },
  },
  {
    title: "Figma-to-Tailwind Design Engine",
    description:
      "A Node.js build-pipeline package that automatically generates Tailwind CSS design tokens and variables directly from Figma design API specs, keeping code and designs in sync.",
    tag: "Tooling",
    tags: ["Node.js", "TypeScript", "Figma API", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://npmjs.com",
    image: {
      url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80",
      width: 600,
      height: 450,
      alt: "Figma design canvas converting to code",
    },
  },
];

export const galleryTiles = [
  {
    id: 1,
    label: "Mountain sunrise",
    location: "Rocky Mountains, CO",
    contributor: {
      name: "Maya Osei",
      initials: "MO",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    tag: "Landscape",
    featured: true,
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&crop=entropy",
    full: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  },
  {
    id: 2,
    label: "City skyline",
    location: "Chicago, IL",
    contributor: {
      name: "Leo Farris",
      initials: "LF",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    tag: "Urban",
    featured: false,
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&crop=entropy",
    full: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
  },
  {
    id: 3,
    label: "Forest trail",
    location: "Olympic NP, WA",
    contributor: {
      name: "Sara Kim",
      initials: "SK",
      avatar: "https://i.pravatar.cc/40?img=5",
    },
    tag: "Nature",
    featured: false,
    src: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80&crop=entropy",
    full: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&q=80",
  },
  {
    id: 4,
    label: "Ocean waves",
    location: "Big Sur, CA",
    contributor: {
      name: "Dante Ruiz",
      initials: "DR",
      avatar: "https://i.pravatar.cc/40?img=7",
    },
    tag: "Coastal",
    featured: true,
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&crop=edges",
    full: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
  },
  {
    id: 5,
    label: "Desert dunes",
    location: "Sahara, Morocco",
    contributor: {
      name: "Nadia Voss",
      initials: "NV",
      avatar: "https://i.pravatar.cc/40?img=9",
    },
    tag: "Landscape",
    featured: false,
    src: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80&crop=entropy",
    full: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=80",
  },
  {
    id: 6,
    label: "Snowy peaks",
    location: "Lauterbrunnen, CH",
    contributor: {
      name: "Jin Park",
      initials: "JP",
      avatar: "https://i.pravatar.cc/40?img=11",
    },
    tag: "Alpine",
    featured: false,
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&crop=edges",
    full: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
  },
  {
    id: 7,
    label: "Autumn leaves",
    location: "Vermont, USA",
    contributor: {
      name: "Fiona Blake",
      initials: "FB",
      avatar: "https://i.pravatar.cc/40?img=13",
    },
    tag: "Seasonal",
    featured: false,
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80&crop=entropy",
    full: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
  },
  {
    id: 8,
    label: "Wildflower field",
    location: "Tuscany, Italy",
    contributor: {
      name: "Arjun Mehta",
      initials: "AM",
      avatar: "https://i.pravatar.cc/40?img=15",
    },
    tag: "Nature",
    featured: true,
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&crop=edges",
    full: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80",
  },
  {
    id: 9,
    label: "Coastal cliffs",
    location: "Moher, Ireland",
    contributor: {
      name: "Cleo Torres",
      initials: "CT",
      avatar: "https://i.pravatar.cc/40?img=17",
    },
    tag: "Coastal",
    featured: false,
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&crop=edges",
    full: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&crop=edges",
  },
  {
    id: 10,
    label: "River valley",
    location: "Columbia Gorge, OR",
    contributor: {
      name: "Eli Grant",
      initials: "EG",
      avatar: "https://i.pravatar.cc/40?img=19",
    },
    tag: "Landscape",
    featured: false,
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&crop=edges",
    full: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&crop=edges",
  },
  {
    id: 11,
    label: "Jungle canopy",
    location: "Amazon Basin, BR",
    contributor: {
      name: "Amara Diop",
      initials: "AD",
      avatar: "https://i.pravatar.cc/40?img=21",
    },
    tag: "Nature",
    featured: false,
    src: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80&crop=edges",
    full: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&q=80&crop=edges",
  },
  {
    id: 12,
    label: "Lakeside dawn",
    location: "Lake Bled, SI",
    contributor: {
      name: "Theo Hartmann",
      initials: "TH",
      avatar: "https://i.pravatar.cc/40?img=23",
    },
    tag: "Landscape",
    featured: false,
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&crop=entropy",
    full: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&crop=entropy",
  },
];

export const blogFeatured = {
  category: "Engineering",
  title: "How I cut API latency by 60% with edge caching",
  image:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  excerpt:
    "Our monolith was fast enough, until it wasn't. We traced the bottleneck to cold database reads on every request and rearchitected the caching layer in three weeks.",
  author: { name: "Alex Gonzalez", initials: "AG", img: 47 },
  date: "Jun 9, 2026",
  readTime: "7 Min Read",
};

export const blogCategories = [
  "All",
  "Engineering",
  "Design",
  "Product",
  "Methodology",
] as const;

export const blogPosts = [
  {
    category: "Design",
    title: "Building a token system that survives a rebrand",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    excerpt:
      "Semantic tokens feel abstract until your brand color changes overnight.",
    author: { name: "Alex Gonzalez", initials: "AG", img: 12 },
    date: "May 28, 2026",
    readTime: "5 Min Read",
  },
  {
    category: "Product",
    title: "What 1,200 user interviews taught us about onboarding",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    excerpt:
      "Drop-off at step two had nothing to do with the UI, it was a mental model gap.",
    author: { name: "Alex Gonzalez", initials: "AG", img: 45 },
    date: "May 14, 2026",
    readTime: "9 Min Read",
  },
  {
    category: "Engineering",
    title: "Shipping a type-safe API layer without a build step",
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
    excerpt:
      "We replaced our codegen pipeline with inferred types and never looked back.",
    author: { name: "Alex Gonzalez", initials: "AG", img: 13 },
    date: "May 2, 2026",
    readTime: "6 Min Read",
  },
  {
    category: "Methodology",
    title: "Why I focus on remote-first engineering workflows",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    excerpt:
      "Three years of hybrid work taught me where collaboration actually happens in distributed projects.",
    author: { name: "Alex Gonzalez", initials: "AG", img: 44 },
    date: "Apr 19, 2026",
    readTime: "4 Min Read",
  },
  {
    category: "Design",
    title: "A practical guide to accessible color contrast",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    excerpt:
      "Pass WCAG without sacrificing the palette your brand team fought for.",
    author: { name: "Alex Gonzalez", initials: "AG", img: 15 },
    date: "Apr 5, 2026",
    readTime: "8 Min Read",
  },
  {
    category: "Product",
    title: "Pricing experiments that doubled our trial conversion",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    excerpt:
      "Small framing changes on the pricing page moved the needle more than discounts.",
    author: { name: "Alex Gonzalez", initials: "AG", img: 41 },
    date: "Mar 22, 2026",
    readTime: "5 Min Read",
  },
];

export const roadmapColumns = [
  {
    status: "Frontend Development",
    icon: RiTerminalBoxLine,
    items: [
      {
        title: "React & Next.js",
        description: "Building highly interactive and performant web applications with server-side rendering, RSC, and dynamic routing.",
        tag: "Core Framework",
        progress: 95,
        techIcon: RiReactjsLine,
      },
      {
        title: "TypeScript",
        description: "Enforcing type safety, improving developer experience, and building scalable codebases with strict type checking.",
        tag: "Language",
        progress: 90,
        techIcon: RiJavascriptLine,
      },
      {
        title: "Tailwind CSS & Motion",
        description: "Rapidly styling modern user interfaces and crafting fluid, physics-based micro-animations for premium user experiences.",
        tag: "Styling & UI",
        progress: 85,
        techIcon: RiTailwindCssFill,
      },
    ],
  },
  {
    status: "Backend & Systems",
    icon: RiDatabase2Line,
    items: [
      {
        title: "Node.js & Express",
        description: "Designing RESTful APIs and robust microservices for scalable data processing and high-throughput networking.",
        tag: "Core Runtime",
        progress: 85,
        techIcon: RiNodejsLine,
      },
      {
        title: "PostgreSQL & Prisma",
        description: "Designing relational database schemas, optimizing complex queries, and managing type-safe migrations.",
        tag: "Database",
        progress: 80,
        techIcon: RiDatabase2Line,
      },
      {
        title: "GraphQL & tRPC",
        description: "Implementing efficient, strictly-typed data fetching endpoints for complex client applications.",
        tag: "API Layer",
        progress: 75,
        techIcon: RiTerminalWindowLine,
      },
    ],
  },
  {
    status: "DevOps & Tooling",
    icon: RiToolsLine,
    items: [
      {
        title: "Git & CI/CD Pipelines",
        description: "Managing version control, code reviews, and automated deployment workflows via GitHub Actions.",
        tag: "Workflow",
        progress: 90,
        techIcon: RiGithubLine,
      },
      {
        title: "Docker & Containers",
        description: "Containerizing applications for consistent development, testing, and isolated deployment environments.",
        tag: "Infrastructure",
        progress: 75,
        techIcon: RiUbuntuLine,
      },
      {
        title: "AWS & Vercel",
        description: "Deploying, monitoring, and scaling edge functions, serverless architectures, and managed databases.",
        tag: "Cloud Services",
        progress: 80,
        techIcon: RiCloudWindyLine,
      },
    ],
  },
];

export const expertiseColumns = [
  {
    status: "System Architecture",
    icon: RiCpuLine,
    items: [
      {
        title: "Microservices & Serverless",
        description: "Designing decoupled, highly available systems utilizing edge computing and serverless architectures.",
        tag: "Scalability",
        progress: 95,
        techIcon: RiServerLine,
      },
      {
        title: "Database Design",
        description: "Architecting normalized relational databases and NoSQL structures optimized for read/write performance.",
        tag: "Data Modeling",
        progress: 90,
        techIcon: RiDatabase2Line,
      },
      {
        title: "API Design & GraphQL",
        description: "Building robust, versioned REST APIs and flexible GraphQL endpoints with strict type-safety.",
        tag: "Interfaces",
        progress: 85,
        techIcon: RiExchangeBoxLine,
      },
    ],
  },
  {
    status: "UI/UX & Design Systems",
    icon: RiLayout3Line,
    items: [
      {
        title: "Component Libraries",
        description: "Crafting highly reusable, accessible (WCAG compliant) component libraries from scratch using Radix and Tailwind.",
        tag: "Design Systems",
        progress: 95,
        techIcon: RiLayoutMasonryLine,
      },
      {
        title: "Micro-Interactions",
        description: "Implementing fluid, physics-based animations with Framer Motion to elevate user experience.",
        tag: "Motion Design",
        progress: 90,
        techIcon: RiMagicLine,
      },
      {
        title: "Responsive Layouts",
        description: "Building complex, adaptive layouts that provide seamless experiences across all device form factors.",
        tag: "Responsive UI",
        progress: 95,
        techIcon: RiSmartphoneLine,
      },
    ],
  },
  {
    status: "Performance & Security",
    icon: RiRocketLine,
    items: [
      {
        title: "Core Web Vitals",
        description: "Optimizing LCP, CLS, and INP metrics to achieve perfect Lighthouse scores and improve SEO.",
        tag: "Optimization",
        progress: 90,
        techIcon: RiRocketLine,
      },
      {
        title: "Caching Strategies",
        description: "Implementing advanced edge caching, stale-while-revalidate, and optimized CDN delivery.",
        tag: "Networking",
        progress: 85,
        techIcon: RiHardDrive2Line,
      },
      {
        title: "Web Security",
        description: "Securing applications against XSS, CSRF, and implementing robust OAuth/SAML authentication flows.",
        tag: "Security",
        progress: 90,
        techIcon: RiShieldKeyholeLine,
      },
    ],
  },
];

// Helper to simulate DB delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getLogos() {
  await delay(10);
  return logos;
}

export async function getFaqs() {
  await delay(10);
  return faqs;
}

export async function getMembers() {
  await delay(10);
  return members;
}

export async function getTimelineJobs() {
  await delay(10);
  return timelineJobs;
}

export async function getProjects() {
  await delay(10);
  return projects;
}

export async function getGalleryTiles() {
  await delay(10);
  return galleryTiles;
}

export async function getBlogFeatured() {
  await delay(10);
  return blogFeatured;
}

export async function getBlogCategories() {
  await delay(10);
  return blogCategories;
}

export async function getBlogPosts() {
  await delay(10);
  return blogPosts;
}

export async function getRoadmapColumns() {
  await delay(10);
  return roadmapColumns;
}

export async function getExpertiseColumns() {
  await delay(10);
  return expertiseColumns;
}
