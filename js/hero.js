// hero.js

// Import GSAP and ScrollTrigger plugin
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Wait for DOM to fully load before executing
document.addEventListener("DOMContentLoaded", () => {
  // Check if current page is the homepage; exit if not
  const isHomePage = document.querySelector(".page.home-page");
  if (!isHomePage) return;

  // Register ScrollTrigger plugin with GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Select hero image elements (both desktop and mobile)
  const heroImgDesktop = document.querySelector(".hero-img-desktop");
  const heroImgMobile = document.querySelector(".hero-img-mobile");
  let currentImageIndex = 1;
  const totalDesktopImages = 10; // 10 desktop images (img1.jpg - img10.jpg)
  const totalMobileImages = 5;   // 5 mobile images (img1-mobile.jpeg - img5-mobile.jpeg)

  // Cycle through images every 250ms
  setInterval(() => {
    // Increment desktop index, reset to 1 if it exceeds 10
    currentImageIndex = currentImageIndex >= totalDesktopImages ? 1 : currentImageIndex + 1;
    
    // Update desktop images (.jpg) - cycles through 1 to 10
    if (heroImgDesktop) {
      heroImgDesktop.src = `/images/hero/img${currentImageIndex}.jpg`;
    }
    
    // Update mobile images (.jpeg) - cycles through 1 to 5
    // Map: 1→1, 2→2, 3→3, 4→4, 5→5, 6→1, 7→2, 8→3, 9→4, 10→5
    if (heroImgMobile) {
      const mobileIndex = ((currentImageIndex - 1) % totalMobileImages) + 1;
      heroImgMobile.src = `/images/hero/img${mobileIndex}-mobile.jpeg`;
    }
  }, 250);

  // Initialize animations with ScrollTrigger
  const initAnimations = () => {
    // Kill existing ScrollTrigger instance to prevent duplicates
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
    }

    // Create new ScrollTrigger instance
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: ".hero-img-holder",
      start: "top bottom",
      end: "top top",
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(".hero-img", {
          y: `${-110 + 110 * progress}%`,
          scale: 0.25 + 0.75 * progress,
          rotation: -15 + 15 * progress,
        });
      },
    });
  };

  let scrollTriggerInstance = null;
  initAnimations();

  window.addEventListener("resize", () => {
    initAnimations();
  });
});