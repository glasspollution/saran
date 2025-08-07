import HeroSection from "@/components/hero-section";
import { BentoDemo } from "@/components/ui/bento-demo";
import { FAQ } from "@/components/ui/faq-section";
import Footer from "@/components/animated-footer";

export default function Home() {
  const leftLinks = [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const rightLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/support", label: "Support" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <div className="home-background min-h-screen">
      <HeroSection />
      <BentoDemo />
      <FAQ />
      <Footer 
        leftLinks={leftLinks}
        rightLinks={rightLinks}
        copyrightText="© 2024 Tailark. All rights reserved."
        barCount={25}
      />
    </div>
  );
}
