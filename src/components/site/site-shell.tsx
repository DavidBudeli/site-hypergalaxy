"use client";

import { useEffect, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
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
import { CosmicBackground } from "@/components/visuals/cosmic-background";
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
    const desktopMotion = window.matchMedia("(min-width: 768px)");
    const cinematicMotion = window.matchMedia("(min-width: 1024px)");
    let lenis: Lenis | undefined;
    let ticker: ((time: number) => void) | undefined;

    if (desktopMotion.matches) {
      lenis = new Lenis({
        duration: 1.18,
        easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.82
      });

      lenis.on("scroll", ScrollTrigger.update);
      ticker = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    }

    const handleAnchorClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        "a[href^='#']"
      );

      if (!link || !lenis) return;

      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, { offset: -86, duration: 1.15 });
      window.history.pushState(null, "", href);
    };

    document.addEventListener("click", handleAnchorClick);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, filter: "blur(12px)", y: 42 },
          {
            autoAlpha: 1,
            filter: "blur(0px)",
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

      gsap.utils
        .toArray<HTMLElement>(
          ".section-shell:not([data-horizontal-section]):not([data-dashboard-story]):not([data-pinned-cards-section])"
        )
        .forEach((section) => {
          gsap.fromTo(
            section,
            { autoAlpha: 0.72, filter: "blur(10px)", scale: 0.985, y: 70 },
            {
              autoAlpha: 1,
              filter: "blur(0px)",
              scale: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 92%",
                end: "top 46%",
                scrub: 0.8
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

      gsap.to("[data-space-depth]", {
        yPercent: 10,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });

      if (cinematicMotion.matches) {
        gsap.utils
          .toArray<HTMLElement>("[data-horizontal-section]")
          .forEach((section) => {
            const viewport = section.querySelector<HTMLElement>(
              "[data-horizontal-viewport]"
            );
            const track = section.querySelector<HTMLElement>("[data-horizontal-track]");

            if (!viewport || !track) return;

            const getTravel = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

            gsap.to(track, {
              x: () => -getTravel(),
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${getTravel() + window.innerHeight * 0.9}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true
              }
            });
          });

        gsap.utils
          .toArray<HTMLElement>("[data-pinned-cards-section]")
          .forEach((section) => {
            const cards = gsap.utils.toArray<HTMLElement>(
              "[data-pinned-card]",
              section
            );

            if (cards.length === 0) return;

            gsap.set(cards, {
              autoAlpha: 0,
              filter: "blur(14px)",
              x: (index) => (index % 2 === 0 ? 110 : -110)
            });

            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${cards.length * 430}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true
              }
            });

            cards.forEach((card, index) => {
              timeline.to(
                card,
                {
                  autoAlpha: 1,
                  filter: "blur(0px)",
                  x: 0,
                  duration: 1,
                  ease: "power3.out"
                },
                index * 0.58
              );
            });
          });
      }
    });

    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      context.revert();
      if (ticker) {
        gsap.ticker.remove(ticker);
      }
      lenis?.destroy();
    };
  }, [locale]);

  return (
    <>
      <CosmicBackground />
      <SiteHeader
        dictionary={dictionary}
        locale={locale}
        onLocaleChange={setLocale}
      />
      <main className="relative z-10">
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
