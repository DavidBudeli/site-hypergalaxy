"use client";

import { useEffect, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ExplorationJourney } from "@/components/sections/exploration-journey";
import { Footer } from "@/components/sections/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { HyperGalaxyPreloader } from "@/components/site/hyper-galaxy-preloader";
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
    const desktopMotion = window.matchMedia("(min-width: 1024px)");
    const cinematicMotion = window.matchMedia("(min-width: 1024px)");
    let lenis: Lenis | undefined;
    let ticker: ((time: number) => void) | undefined;

    if (desktopMotion.matches) {
      lenis = new Lenis({
        duration: 0.78,
        easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
        lerp: 0.13,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.94
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
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              once: true
            }
          }
        );
      });

      if (cinematicMotion.matches) {
        gsap.utils.toArray<HTMLElement>("[data-journey-stage]").forEach((section) => {
          gsap.fromTo(
            section,
            { autoAlpha: 0.72, y: 34 },
            {
              autoAlpha: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                scrub: 0.6,
                start: "top 88%",
                end: "top 34%"
              }
            }
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
          const distance = Number(element.dataset.parallax || 30) * 0.42;
          gsap.to(element, {
            y: distance,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              scrub: 0.45,
              start: "top bottom",
              end: "bottom top"
            }
          });
        });

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
                scrub: 0.45,
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
      <HyperGalaxyPreloader />
      <CosmicBackground />
      <SiteHeader
        dictionary={dictionary}
        locale={locale}
        onLocaleChange={setLocale}
      />
      <main className="relative z-10">
        <HeroSection dictionary={dictionary} />
        <ExplorationJourney dictionary={dictionary} />
      </main>
      <Footer dictionary={dictionary} />
    </>
  );
}
