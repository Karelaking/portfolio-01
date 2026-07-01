import React from "react";
import { getTimelineJobs } from "@/lib/data";
import ExperienceManager from "./experience-manager";

export default async function Page() {
  const initialJobs = await getTimelineJobs();
  return <ExperienceManager initialJobs={initialJobs} />;
}
