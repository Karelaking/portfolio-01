"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RiMailSendLine } from "@remixicon/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";

const TOPICS = ["Freelance Project", "Full-time / Contract Role", "General Inquiry", "Collaboration / Open Source"];

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  topic: z.string().min(1, "Please select a topic"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Privacy Policy",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema as any),
    defaultValues: {
      name: "",
      email: "",
      topic: "",
      message: "",
      consent: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form data submitted:", data);
    toast.success("Message sent successfully. I'll get back to you shortly!");
    reset();
  };

  const topicValue = watch("topic");
  const consentValue = watch("consent");

  return (
    <Card className="w-full">
        <form
          className="flex flex-col gap-(--card-spacing)"
          onSubmit={handleSubmit(onSubmit)}
        >
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Send a message
            </CardTitle>
            <CardDescription>
              Tell me a bit about what you need.
            </CardDescription>
          </CardHeader>

          <Separator />

          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full name</FieldLabel>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Jane Doe" 
                  {...register("name")}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-xs text-destructive mt-1.5">{errors.name.message}</p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email address</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1.5">{errors.email.message}</p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="topic">Topic</FieldLabel>
                <Select 
                  name="topic" 
                  value={topicValue}
                  onValueChange={(val) => setValue("topic", val as string, { shouldValidate: true })}
                >
                  <SelectTrigger id="topic" className="w-full" aria-invalid={!!errors.topic}>
                    <SelectValue placeholder="Select a topic…" />
                  </SelectTrigger>
                  <SelectContent>
                    {TOPICS.map((topic) => (
                      <SelectItem key={topic} value={topic}>
                        {topic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.topic && (
                  <p className="text-xs text-destructive mt-1.5">{errors.topic.message}</p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="message">Message</FieldLabel>
                <Textarea
                  id="message"
                  rows={6}
                  className="min-h-32 resize-none"
                  placeholder="How can I help you?"
                  {...register("message")}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="text-xs text-destructive mt-1.5">{errors.message.message}</p>
                )}
              </Field>
            </FieldGroup>
          </CardContent>

          <CardFooter className="flex flex-col items-stretch gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2.5">
                <Checkbox 
                  id="consent" 
                  checked={consentValue}
                  onCheckedChange={(checked) => setValue("consent", checked as boolean, { shouldValidate: true })}
                />
                <label
                  htmlFor="consent"
                  className="text-xs leading-snug font-normal text-muted-foreground"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
              {errors.consent && (
                <p className="text-xs text-destructive">{errors.consent.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <RiMailSendLine data-icon="inline-start" />
                  Send Message
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
  );
}
