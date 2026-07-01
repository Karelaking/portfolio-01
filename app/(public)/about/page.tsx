import React from "react";
import { Metadata } from "next";
import AboutContent from "@/components/about-content";
import { getAboutData } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Alex Gonzalez, his journey as a software engineer, core design principles, and building modern, high-performance web systems.",
};

const Page = async (): Promise<React.ReactNode> => {
  const aboutData = await getAboutData();
  return <AboutContent {...aboutData} />;
};

export default Page;

