import React from "react";
import { getExpertiseColumns } from "@/lib/data";
import ExpertiseManager from "./expertise-manager";

export default async function Page() {
  const initialColumns = await getExpertiseColumns();
  return <ExpertiseManager initialColumns={initialColumns} />;
}
