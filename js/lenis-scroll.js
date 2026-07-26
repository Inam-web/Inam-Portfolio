// lenis-scroll.js

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Wait for DOM to fully load before executing
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
  // FIX: Refresh ScrollTrigger on resize
  // ============================================
  
  // Refresh on load
  window.addEventListener("load", () => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  });

  // Refresh on resize - WITH DEBOUNCE
  let resizeTimeout;
  window.addEventListener("resize", () => {
    // Clear previous timeout
    clearTimeout(resizeTimeout);
    
    // Wait for resize to finish
    resizeTimeout = setTimeout(() => {
      // Refresh ScrollTrigger
      ScrollTrigger.refresh();
      
      // Refresh again after a moment
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    }, 300);
  });

  // Refresh on orientation change (mobile)
  window.addEventListener("orientationchange", () => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  });

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
      
      // Refresh after Lenis rebuild
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    }
  };

  window.addEventListener("resize", handleResize);
});