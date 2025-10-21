import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/providers/ThemeProvider";
import MouseSparkles from "@/components/ui/MouseSparkles";
import "./globals.css";

export const metadata: Metadata = {
  title: "LittleText - Stories Worth Reading",
  description: "Thoughtful content delivered with clarity and purpose. A minimalist blogging platform for stories that matter.",
  keywords: ["blog", "writing", "stories", "articles", "content"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">
        <ThemeProvider>
          <MouseSparkles />
          <Header />
          <main className="pt-16 md:pt-20 min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
