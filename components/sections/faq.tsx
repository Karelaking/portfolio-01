import { getFaqs } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function FaqSection() {
  const faqs = await getFaqs();

  return (
    <div className="w-full max-w-5xl mt-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mt-3 text-muted-foreground">
          Have questions about how we can work together? Here are some quick answers.
        </p>
      </div>
      <Accordion defaultValue={[faqs[0].q]} className="mt-10">
        {faqs.map(({ q, a }) => (
          <AccordionItem key={q} value={q}>
            <AccordionTrigger className="py-4 text-base font-medium">
              {q}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-base text-muted-foreground">
              {a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
