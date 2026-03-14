"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function ViewportEffects() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(any-hover: hover)").matches;
    const finePointer = window.matchMedia("(any-pointer: fine)").matches;
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const parallaxLayers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const root = document.documentElement;
    const body = document.body;
    let parallaxFrame = 0;
    let lenisFrame = 0;
    let readyFrame = 0;

    body.classList.add(prefersReducedMotion ? "motion-calm" : "motion-full");
    readyFrame = window.requestAnimationFrame(() => {
      body.classList.add("motion-ready");
    });

    const setScrollState = (scrollY: number) => {
      const scrollLimit = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      const progress = Math.min(scrollY / scrollLimit, 1);

      body.classList.toggle("has-scrolled", scrollY > 20);
      root.style.setProperty("--scroll-progress", progress.toFixed(4));
      root.style.setProperty("--scroll-depth", `${Math.min(scrollY, 180).toFixed(2)}px`);
    };

    const updateParallax = () => {
      parallaxFrame = 0;
      const viewportHeight = window.innerHeight;
      const intensity = prefersReducedMotion ? 10 : 34;

      parallaxLayers.forEach((layer) => {
        const rect = layer.getBoundingClientRect();
        const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
        const shift = (progress - 0.5) * intensity;

        layer.style.setProperty("--parallax-shift", `${shift.toFixed(2)}px`);
      });
    };

    const requestTick = () => {
      if (parallaxFrame) {
        return;
      }

      parallaxFrame = window.requestAnimationFrame(updateParallax);
    };

    const anchorHandler = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest<HTMLAnchorElement>('a[href^="#"]');
      const href = link?.getAttribute("href");

      if (!link || !href || href === "#") {
        return;
      }

      const destination = document.querySelector<HTMLElement>(href);

      if (!destination) {
        return;
      }

      event.preventDefault();

      if (lenis) {
        lenis.scrollTo(destination, {
          offset: -96,
          duration: prefersReducedMotion ? 0.9 : 1.35,
        });
        return;
      }

      destination.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const magneticCleanups: Array<() => void> = [];

    if (canHover && finePointer && !prefersReducedMotion) {
      const magneticElements = Array.from(
        document.querySelectorAll<HTMLElement>("[data-magnetic]"),
      );

      magneticElements.forEach((element) => {
        const handleMove = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          const offsetX = event.clientX - (rect.left + rect.width / 2);
          const offsetY = event.clientY - (rect.top + rect.height / 2);
          const strength = Math.min(rect.width, rect.height) > 96 ? 0.14 : 0.22;

          element.style.setProperty("--magnetic-x", `${(offsetX * strength).toFixed(2)}px`);
          element.style.setProperty("--magnetic-y", `${(offsetY * strength).toFixed(2)}px`);
        };

        const handleLeave = () => {
          element.style.setProperty("--magnetic-x", "0px");
          element.style.setProperty("--magnetic-y", "0px");
        };

        element.addEventListener("pointermove", handleMove);
        element.addEventListener("pointerleave", handleLeave);

        magneticCleanups.push(() => {
          element.removeEventListener("pointermove", handleMove);
          element.removeEventListener("pointerleave", handleLeave);
          handleLeave();
        });
      });
    }

    let observer: IntersectionObserver | null = null;
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: prefersReducedMotion ? 0.08 : 0.16,
        rootMargin: prefersReducedMotion ? "0px 0px -4% 0px" : "0px 0px -8% 0px",
      },
    );

    revealElements.forEach((element) => revealObserver.observe(element));
    observer = revealObserver;

    let lenis: Lenis | null = null;
    lenis = new Lenis({
      duration: prefersReducedMotion ? 0.9 : 1.45,
      lerp: prefersReducedMotion ? 0.14 : 0.065,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1,
      wheelMultiplier: prefersReducedMotion ? 0.92 : 0.82,
    });

    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      setScrollState(scroll);
      requestTick();
    });

    const raf = (time: number) => {
      lenis?.raf(time);
      lenisFrame = window.requestAnimationFrame(raf);
    };

    lenisFrame = window.requestAnimationFrame(raf);

    setScrollState(window.scrollY);
    updateParallax();
    window.addEventListener("resize", requestTick);
    document.addEventListener("click", anchorHandler);

    return () => {
      observer?.disconnect();
      document.removeEventListener("click", anchorHandler);
      magneticCleanups.forEach((cleanup) => cleanup());
      window.removeEventListener("resize", requestTick);
      lenis?.destroy();
      window.cancelAnimationFrame(parallaxFrame);
      window.cancelAnimationFrame(lenisFrame);
      window.cancelAnimationFrame(readyFrame);
      body.classList.remove("motion-ready", "motion-calm", "motion-full", "has-scrolled");
    };
  }, []);

  return null;
}
