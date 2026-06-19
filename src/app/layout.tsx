import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Outfit,
  Jersey_20,
  EB_Garamond,
  PT_Serif,
  Merriweather,
  JetBrains_Mono,
} from "next/font/google";

// single control for ALL body/prose text on the site
//   IBM_Plex_Sans
//   Space_Grotesk
import { IBM_Plex_Sans as ProseFont } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";
import { SceneWrapper } from "@/components/layout/SceneWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jersey20 = Jersey_20({
  subsets: ["latin"],
  variable: "--font-jersey",
  weight: ["400"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const ptSerif = PT_Serif({
  subsets: ["latin"],
  variable: "--font-pt-serif",
  weight: ["400", "700"],
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const proseFont = ProseFont({
  subsets: ["latin"],
  variable: "--font-prose",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Szymon Wilczek | Portfolio",
    template: "%s | Szymon Wilczek",
  },
  description: "Software developer building pixel-perfect experiences.",
  keywords: [
    "developer",
    "portfolio",
    "fullstack",
    "react",
    "next.js",
    "typescript",
    "web development",
  ],
  authors: [
    { name: "Szymon Wilczek", url: "https://github.com/szymonwilczek" },
  ],
  creator: "Szymon Wilczek",
  metadataBase: new URL("https://szymon-wilczek.me"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Szymon Wilczek",
    title: "Szymon Wilczek | Portfolio",
    description: "Software developer building pixel-perfect experiences.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Szymon Wilczek - Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Szymon Wilczek | Portfolio",
    description: "Software developer building pixel-perfect experiences.",
    images: ["/twitter-image.png"],
    creator: "@wvilczek",
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "32x32" }],
    apple: [{ url: "/favicon.ico", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${outfit.variable}
        ${jersey20.variable}
        ${ebGaramond.variable}
        ${ptSerif.variable}
        ${merriweather.variable}
        ${jetbrainsMono.variable}
        ${proseFont.variable}
        antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <SceneWrapper />
          {children}
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              classNames: {
                toast:
                  "gap-3 !bg-[var(--toast-bg,var(--background))]/40 backdrop-blur-sm !text-[var(--toast-text,var(--foreground))]/80 !border-[var(--toast-border,var(--border))]/40 !shadow-lg",
                description:
                  "!text-[var(--toast-muted,var(--muted-foreground))]/80",
                actionButton: "!bg-primary !text-primary-foreground",
                cancelButton: "!bg-muted !text-muted-foreground",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
