// services.js - Premium Inner Content (Updated - Removed CTA)

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", () => {
  const isHomePage = document.querySelector(".page.home-page");
  if (!isHomePage) return;

  gsap.registerPlugin(ScrollTrigger);

  const hasPremiumInner = document.querySelector(".services-premium-inner");
  if (!hasPremiumInner) return;

  // ============================================
  // 1. CARD ENTRANCE
  // ============================================
  
  const cards = document.querySelectorAll(".service-premium-inner-card");
  
  cards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      delay: index * 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // ============================================
  // 2. ICON REVEAL
  // ============================================
  
  const icons = document.querySelectorAll(".service-premium-inner-icon");
  
  icons.forEach((icon) => {
    gsap.from(icon, {
      scale: 0,
      rotation: -45,
      duration: 0.6,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: icon.closest(".service-premium-inner-card"),
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // ============================================
  // 3. NUMBER REVEAL
  // ============================================
  
  const numbers = document.querySelectorAll(".service-premium-inner-number");
  
  numbers.forEach((number) => {
    gsap.from(number, {
      opacity: 0,
      x: -20,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: number.closest(".service-premium-inner-card"),
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // ============================================
  // 4. STATS COUNTER ANIMATION
  // ============================================
  
  const statNumbers = document.querySelectorAll(".stat-number");
  
  statNumbers.forEach((stat) => {
    const originalText = stat.textContent;
    const targetNumber = parseInt(originalText);
    
    if (!isNaN(targetNumber)) {
      let obj = { value: 0 };
      
      gsap.to(obj, {
        value: targetNumber,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stat.closest(".service-premium-inner-card"),
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        onUpdate: function() {
          const current = Math.round(obj.value);
          if (originalText.includes('+')) {
            stat.textContent = current + '+';
          } else if (originalText.includes('%')) {
            stat.textContent = current + '%';
          } else {
            stat.textContent = current;
          }
        },
        onComplete: function() {
          stat.textContent = originalText;
        }
      });
    }
  });

  // ============================================
  // 5. TECH ITEMS STAGGER
  // ============================================
  
  cards.forEach((card) => {
    const techItems = card.querySelectorAll(".tech-item");
    
    gsap.from(techItems, {
      opacity: 0,
      y: 10,
      duration: 0.4,
      stagger: 0.06,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // ============================================
  // 6. HEADER ANIMATION
  // ============================================
  
  const header = document.querySelector(".services-premium-inner-header");
  
  gsap.from(header, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: header,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });

  // ============================================
  // 7. DECORATION ANIMATION ON HOVER
  // ============================================
  
  cards.forEach((card) => {
    const decoration = card.querySelector(".service-premium-inner-decoration");
    const dot = decoration?.querySelector(".decoration-dot");
    const lines = decoration?.querySelectorAll(".decoration-line");
    
    if (decoration) {
      card.addEventListener("mouseenter", () => {
        if (dot) {
          gsap.to(dot, {
            scale: 1.8,
            duration: 0.3,
            ease: "back.out(1.7)",
          });
        }
        if (lines) {
          lines.forEach((line, i) => {
            gsap.to(line, {
              scaleX: 1.5,
              duration: 0.3,
              delay: i * 0.08,
              ease: "power2.out",
              transformOrigin: "left center",
            });
          });
        }
      });
      
      card.addEventListener("mouseleave", () => {
        if (dot) {
          gsap.to(dot, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }
        if (lines) {
          lines.forEach((line) => {
            gsap.to(line, {
              scaleX: 1,
              duration: 0.3,
              ease: "power2.out",
              transformOrigin: "left center",
            });
          });
        }
      });
    }
  });

  // ============================================
  // 8. IMAGE OVERLAY ON HOVER
  // ============================================
  
  cards.forEach((card) => {
    const overlayContent = card.querySelector(".overlay-content");
    
    if (overlayContent) {
      gsap.set(overlayContent, { y: 20 });
    }
    
    card.addEventListener("mouseenter", () => {
      if (overlayContent) {
        gsap.to(overlayContent, {
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      }
    });
    
    card.addEventListener("mouseleave", () => {
      if (overlayContent) {
        gsap.to(overlayContent, {
          y: 20,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    });
  });

  // ============================================
  // 9. MAGNETIC EFFECT (Desktop)
  // ============================================
  
  if (window.innerWidth > 768) {
    cards.forEach((card) => {
      const wrapper = card.querySelector(".service-premium-inner-card-wrapper");
      
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
        
        if (wrapper) {
          gsap.to(wrapper, {
            x: x,
            y: y,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      });
      
      card.addEventListener("mouseleave", () => {
        if (wrapper) {
          gsap.to(wrapper, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        }
      });
    });
  }
});