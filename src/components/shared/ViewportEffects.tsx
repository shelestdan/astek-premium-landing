"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function ViewportEffects() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const parallaxLayers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const root = document.documentElement;
    const body = document.body;
    let nativeScrollCleanup = () => {};
    let nativeResizeCleanup = () => {};
    let parallaxFrame = 0;
    let lenisFrame = 0;

    if (reducedMotion) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
    }

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

      if (reducedMotion) {
        parallaxLayers.forEach((layer) => {
          layer.style.setProperty("--parallax-shift", "0px");
        });
        return;
      }

      const viewportHeight = window.innerHeight;

      parallaxLayers.forEach((layer) => {
        const rect = layer.getBoundingClientRect();
        const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
        const shift = (progress - 0.5) * 28;

        layer.style.setProperty("--parallax-shift", `${shift.toFixed(2)}px`);
      });
    };

    const requestTick = () => {
      if (reducedMotion) {
        return;
      }

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
        lenis.scrollTo(destination, { offset: -96, duration: 1.15 });
        return;
      }

      destination.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const magneticCleanups: Array<() => void> = [];

    if (!reducedMotion && finePointer) {
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

    if (!reducedMotion) {
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
          threshold: 0.16,
          rootMargin: "0px 0px -8% 0px",
        },
      );

      revealElements.forEach((element) => revealObserver.observe(element));
      observer = revealObserver;
    }

    let lenis: Lenis | null = null;

    if (!reducedMotion) {
      lenis = new Lenis({
        duration: 1.12,
        lerp: 0.08,
        smoothWheel: true,
        syncTouch: true,
        touchMultiplier: 1.02,
        wheelMultiplier: 0.88,
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
    } else {
      const handleNativeScroll = () => {
        setScrollState(window.scrollY);
      };

      const handleNativeResize = () => {
        setScrollState(window.scrollY);
        updateParallax();
      };

      window.addEventListener("scroll", handleNativeScroll, { passive: true });
      window.addEventListener("resize", handleNativeResize);

      nativeScrollCleanup = () => window.removeEventListener("scroll", handleNativeScroll);
      nativeResizeCleanup = () => window.removeEventListener("resize", handleNativeResize);
    }

    setScrollState(window.scrollY);
    updateParallax();
    document.addEventListener("click", anchorHandler);

    return () => {
      observer?.disconnect();
      document.removeEventListener("click", anchorHandler);
      magneticCleanups.forEach((cleanup) => cleanup());
      nativeScrollCleanup();
      nativeResizeCleanup();
      lenis?.destroy();
      window.cancelAnimationFrame(parallaxFrame);
      window.cancelAnimationFrame(lenisFrame);
    };
  }, []);

  return null;
}
