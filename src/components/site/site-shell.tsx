"use client";

import { useEffect, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AboutSection } from "@/components/sections/about-section";
import { DashboardPreviewSection } from "@/components/sections/dashboard-preview-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { Footer } from "@/components/sections/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ImpactSection } from "@/components/sections/impact-section";
import { LogoSliderSection } from "@/components/sections/logo-slider-section";
import { MarketplaceSection } from "@/components/sections/marketplace-section";
import { TicketsSection } from "@/components/sections/tickets-section";
import { SiteHeader } from "@/components/site/site-header";
import { dictionaries, type Locale } from "@/lib/i18n";

export function SiteShell() {
  const [locale, setLocale] = useState<Locale>("pt");
  const dictionary = useMemo(() => dictionaries[locale], [locale]);

  useEffect(() => {
    const storedLocale = window.localStorage.getItem("hyper-galaxy-locale");
    if (storedLocale === "pt" || storedLocale === "en") {
      const timeout = window.setTimeout(() => {
        setLocale(storedLocale);
      }, 0);

      return () => window.clearTimeout(timeout);
    }

    return undefined;
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en-US";
    window.localStorage.setItem("hyper-galaxy-locale", locale);
  }, [locale]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              once: true
            }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        const distance = Number(element.dataset.parallax || 40);
        gsap.to(element, {
          y: distance,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            scrub: true,
            start: "top bottom",
            end: "bottom top"
          }
        });
      });
    });

    return () => context.revert();
  }, [locale]);

  return (
    <>
      <SiteHeader
        dictionary={dictionary}
        locale={locale}
        onLocaleChange={setLocale}
      />
      <main>
        <HeroSection dictionary={dictionary} />
        <LogoSliderSection dictionary={dictionary} />
        <AboutSection dictionary={dictionary} />
        <MarketplaceSection dictionary={dictionary} />
        <DashboardPreviewSection dictionary={dictionary} />
        <TicketsSection dictionary={dictionary} />
        <ImpactSection dictionary={dictionary} />
        <FinalCtaSection dictionary={dictionary} />
      </main>
      <Footer dictionary={dictionary} />
    </>
  );
}
