"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const sectionLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const pageLinks = [
  { name: "Games", path: "/pages/games" },
];

const SCROLL_THRESHOLD = 200;

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["about", "projects", "experience", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <div
      className={`fixed right-4 top-1/2 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      }`}
      style={{ transform: "translateY(-50%)" }}
    >
      <nav className="bg-nav-bg border border-card-border rounded-xl shadow-lg backdrop-blur-sm flex flex-col items-center py-3 px-2 gap-1">
        {sectionLinks.map((link) => {
          const isActive = isHome && activeSection === link.href.slice(1);
          return (
            <a
              key={link.href}
              href={link.href}
              title={link.name}
              className={`w-10 h-10 flex items-center justify-center rounded-lg text-xs font-medium transition-all duration-200 ${
                isActive
                  ? "bg-sky-blue text-white shadow-sm"
                  : "text-nav-text link-hover"
              }`}
            >
              {link.name.charAt(0)}
            </a>
          );
        })}
        <div className="w-6 h-px bg-card-border my-1" />
        {pageLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              title={link.name}
              className={`w-10 h-10 flex items-center justify-center rounded-lg text-xs font-medium transition-all duration-200 ${
                isActive
                  ? "bg-sky-blue text-white shadow-sm"
                  : "text-nav-text link-hover"
              }`}
            >
              {link.name.charAt(0)}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
