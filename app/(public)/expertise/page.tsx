import React from "react";
import ExpertiseBlock from "@/components/expertise-block";
import { getExpertiseColumns } from "@/lib/data";

const Page = async (): Promise<React.ReactNode> => {
  const expertiseColumns = await getExpertiseColumns();

  return (
    <section className="w-full bg-background text-foreground py-16">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 mb-12 text-center">
        <span className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          Expertise
        </span>
        <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl capitalize">
          Core Competencies
        </h2>
        <p className="mt-3 text-base text-muted-foreground px-4 sm:px-24">
          A deep dive into the engineering domains, system architectures, and design methodologies I leverage to build scalable products.
        </p>
      </div>

      <ExpertiseBlock columns={expertiseColumns} />
    </section>
  );
};

export default Page;
