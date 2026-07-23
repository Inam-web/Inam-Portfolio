// lenis-scroll.js

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  // Register ScrollTrigger with GSAP
  gsap.registerPlugin(ScrollTrigger);
  
  // Determine if device is mobile
  let isMobile = window.innerWidth <= 900;

  // Scroll settings
  const scrollSettings = isMobile
    ? {
        duration: 1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: true,
        touchMultiplier: 1.5,
        infinite: false,
        lerp: 0.05,
        wheelMultiplier: 1,
        orientation: "vertical",
        smoothWheel: true,
        syncTouch: true,
      }
    : {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
        lerp: 0.1,
        wheelMultiplier: 1,
        orientation: "vertical",
        smoothWheel: true,
        syncTouch: true,
      };

  // Initialize Lenis
  let lenis = new Lenis(scrollSettings);

  // Update ScrollTrigger on scroll
  lenis.on("scroll", ScrollTrigger.update);

  // Connect Lenis to GSAP ticker
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  
  // Disable lag smoothing
  gsap.ticker.lagSmoothing(0);

  // ============================================
  // FIX: Refresh ScrollTrigger multiple times
  // ============================================
  
  // Refresh on load
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });

  // Refresh on resize
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });

  // Refresh after delays (for dynamic content)
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 300);

  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 800);

  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 1500);

  // ============================================
  // Handle window resize for Lenis
  // ============================================
  
  const handleResize = () => {
    const wasMobile = isMobile;
    isMobile = window.innerWidth <= 900;

    if (wasMobile !== isMobile) {
      lenis.destroy();

      const newScrollSettings = isMobile
        ? {
            duration: 1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            smoothTouch: true,
            touchMultiplier: 1.5,
            infinite: false,
            lerp: 0.05,
            wheelMultiplier: 1,
            orientation: "vertical",
            smoothWheel: true,
            syncTouch: true,
          }
        : {
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
            lerp: 0.1,
            wheelMultiplier: 1,
            orientation: "vertical",
            smoothWheel: true,
            syncTouch: true,
          };

      lenis = new Lenis(newScrollSettings);
      lenis.on("scroll", ScrollTrigger.update);
    }
  };

  window.addEventListener("resize", handleResize);
});