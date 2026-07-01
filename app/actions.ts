"use server";

import { revalidatePath } from "next/cache";
import * as db from "@/lib/data";

// 1. Hero Settings
export async function updateHeroAction(data: {
  greeting: string;
  name: string;
  role: string;
  subheading: string;
  resumeUrl: string;
  githubUrl: string;
}) {
  await db.saveHeroData(data);
  revalidatePath("/");
  revalidatePath("/dashboard");
  return { success: true };
}

// 2. About Settings
export async function updateAboutAction(data: {
  journeyTitle: string;
  bioParagraph1: string;
  bioParagraph2: string;
  experienceYears: number;
  skillsList: string[];
}) {
  await db.saveAboutData(data);
  revalidatePath("/about");
  revalidatePath("/");
  revalidatePath("/dashboard");
  return { success: true };
}

// 3. Projects Settings
export async function updateProjectsAction(projects: any[]) {
  await db.saveProjects(projects);
  revalidatePath("/projects");
  revalidatePath("/");
  revalidatePath("/dashboard");
  return { success: true };
}

// 4. Expertise Settings
export async function updateExpertiseAction(columns: any[]) {
  await db.saveExpertiseColumns(columns);
  revalidatePath("/expertise");
  revalidatePath("/");
  revalidatePath("/dashboard");
  return { success: true };
}

// 5. Experience Settings
export async function updateExperienceAction(jobs: any[]) {
  await db.saveTimelineJobs(jobs);
  revalidatePath("/experience");
  revalidatePath("/");
  revalidatePath("/dashboard");
  return { success: true };
}

// 6. Gallery Settings
export async function updateGalleryAction(tiles: any[]) {
  await db.saveGalleryTiles(tiles);
  revalidatePath("/gallery");
  revalidatePath("/");
  revalidatePath("/dashboard");
  return { success: true };
}

// 7. Blogs Settings
export async function updateBlogsAction(posts: any[]) {
  await db.saveBlogPosts(posts);
  revalidatePath("/blogs");
  revalidatePath("/");
  revalidatePath("/dashboard");
  return { success: true };
}


// 8. Contact Settings
export async function updateContactAction(data: {
  location: string;
  remoteInfo: string;
  email: string;
}) {
  await db.saveContactData(data);
  revalidatePath("/contact");
  revalidatePath("/");
  revalidatePath("/dashboard");
  return { success: true };
}

// Templates helper
function newProjectTemplate() {
  return {
    title: "",
    description: "",
    tag: "",
    tags: [],
    github: "https://github.com",
    demo: null,
    image: {
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      width: 600,
      height: 450,
      alt: "Project preview screenshot",
    },
  };
}

function newJobTemplate() {
  return {
    role: "",
    company: "",
    period: "",
    location: "San Francisco, CA",
    description: "",
    tags: [],
    image: {
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&q=80",
      width: 100,
      height: 100,
      alt: "Company logo",
    },
  };
}
