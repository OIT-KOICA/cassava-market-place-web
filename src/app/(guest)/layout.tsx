"use client";

import { lazy, useEffect, useState } from "react";
import { useTheme } from "next-themes";

const Navigation = lazy(() => import("@/components/layout/guest/navigation"));
const Footer = lazy(() => import("@/components/layout/guest/footer"));

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation isScrolled={isScrolled} theme={theme} setTheme={setTheme} />
      {children}
      <Footer />
    </div>
  );
}
