"use client"

import { useState } from "react"
import { RiGithubFill, RiGoogleFill } from "@remixicon/react"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Toaster } from "@/components/ui/sonner"

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

export default function AuthBlock() {
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    const result = signInSchema.safeParse(data)
    if (!result.success) {
      const next: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0]
        if (typeof key === "string" && !next[key]) {
          next[key] = issue.message
        }
      }
      setErrors(next)
      return
    }
    setErrors({})
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1400)), {
      loading: "Signing you in…",
      success: "Welcome back to Acme!",
      error: "Sign-in failed. Please try again.",
    })
  }

  function clearError(name: string) {
    setErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  return (
    <section className="flex w-full items-center justify-center bg-background px-6 py-12 text-foreground">
      <Toaster />
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <span className="mx-auto grid grid-cols-2 gap-1" aria-hidden="true">
            <span className="size-3 bg-primary" />
            <span className="size-3 bg-primary" />
            <span className="size-3 bg-primary" />
            <span className="size-3 bg-primary" />
          </span>
          <CardTitle className="mt-4 text-xl font-bold tracking-tight">
            Sign in to Acme
          </CardTitle>
          <CardDescription className="text-sm">
            Welcome back. Enter your details to continue.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          <form onSubmit={handleSubmit} noValidate>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  onChange={() => clearError("email")}
                />
                <FieldError>{errors.email}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                  onChange={() => clearError("password")}
                />
                <FieldError>{errors.password}</FieldError>
              </Field>
              <Field orientation="horizontal" className="justify-between">
                <FieldLabel
                  htmlFor="remember"
                  className="font-normal text-muted-foreground"
                >
                  <Checkbox id="remember" name="remember" />
                  Remember me
                </FieldLabel>
                <Button
                  variant="link"
                  size="xs"
                  className="h-auto p-0 text-xs"
                  render={<a href="#" />}
                  nativeButton={false}
                >
                  Forgot Password?
                </Button>
              </Field>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </FieldGroup>
          </form>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <Separator className="flex-1" />
            Or
            <Separator className="flex-1" />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => toast("Continuing with Google…")}
            >
              <RiGoogleFill data-icon="inline-start" />
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => toast("Continuing with GitHub…")}
            >
              <RiGithubFill data-icon="inline-start" />
              GitHub
            </Button>
          </div>
        </CardContent>

        <CardFooter className="justify-center text-sm text-muted-foreground">
          Don&apos;t have an account?
          <Button
            variant="link"
            className="px-1"
            render={<a href="#" />}
            nativeButton={false}
          >
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}
