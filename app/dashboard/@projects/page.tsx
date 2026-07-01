import React from "react";
import { getProjects } from "@/lib/data";
import ProjectsManager from "./projects-manager";

export default async function Page() {
  const initialProjects = await getProjects();
  return <ProjectsManager initialProjects={initialProjects} />;
}
