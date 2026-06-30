import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Provider from "@/components/provider";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alexgonzalez.dev"),
  title: {
    default: "Alex Gonzalez | Senior Software Engineer & Designer",
    template: "%s | Alex Gonzalez"
  },
  description: "Alex Gonzalez is a senior software engineer and designer specializing in building premium Next.js apps, robust microservices, and interactive UI systems.",
  keywords: ["Software Engineer", "Frontend Architect", "Next.js Developer", "React Developer", "Full-Stack Developer", "Web Designer"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Alex Gonzalez | Senior Software Engineer & Designer",
    description: "Explore the portfolio, open-source projects, and technical writings of Alex Gonzalez.",
    url: "https://alexgonzalez.dev",
    siteName: "Alex Gonzalez Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Gonzalez | Senior Software Engineer & Designer",
    description: "Explore the portfolio, open-source projects, and technical writings of Alex Gonzalez.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
