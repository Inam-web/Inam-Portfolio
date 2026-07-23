// contact.js

// Wait for DOM to fully load before executing
document.addEventListener("DOMContentLoaded", () => {
  // Check if current page is the contact page; exit if not
  const isContactPage = document.querySelector(".page.contact-page");
  if (!isContactPage) return;

  // ============================================
  // IMAGE TRAIL (Keep as is)
  // ============================================
  
  const container = document.querySelector(".trail-container");
  let isDesktop = window.innerWidth > 1000;
  let animationId = null;
  let mouseMoveListener = null;

  const config = {
    imageCount: 8,
    imageLifespan: 800,
    removalDelay: 60,
    mouseThreshold: 80,
    inDuration: 600,
    outDuration: 800,
    inEasing: "cubic-bezier(.07,.5,.5,1)",
    outEasing: "cubic-bezier(.87, 0, .13, 1)",
  };

  const images = Array.from(
    { length: config.imageCount },
    (_, i) => `/images/work-items/work-item-${i + 1}.jpg`
  );
  const trail = [];
  let mouseX = 0,
    mouseY = 0,
    lastMouseX = 0,
    lastMouseY = 0;
  let isCursorInContainer = false;
  let lastRemovalTime = 0;

  const createFloatingElements = () => {
    const floatingContainer = document.querySelector(".floating-elements");
    if (!floatingContainer) return;
    for (let i = 0; i < 12; i++) {
      const element = document.createElement("div");
      element.className = "floating-element";
      element.style.left = Math.random() * 100 + "%";
      element.style.animationDelay = Math.random() * 8 + "s";
      element.style.animationDuration = 8 + Math.random() * 4 + "s";
      floatingContainer.appendChild(element);
    }
  };

  const isInContainer = (x, y) => {
    const rect = container.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  };

  const hasMovedEnough = () => {
    const distance = Math.sqrt(
      Math.pow(mouseX - lastMouseX, 2) + Math.pow(mouseY - lastMouseY, 2)
    );
    return distance > config.mouseThreshold;
  };

  const createImage = () => {
    const img = document.createElement("img");
    img.classList.add("trail-img");
    const randomIndex = Math.floor(Math.random() * images.length);
    const rotation = (Math.random() - 0.5) * 40;
    img.src = images[randomIndex];
    const rect = container.getBoundingClientRect();
    const relativeX = mouseX - rect.left;
    const relativeY = mouseY - rect.top;
    img.style.left = `${relativeX}px`;
    img.style.top = `${relativeY}px`;
    img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0)`;
    img.style.transition = `transform ${config.inDuration}ms ${config.inEasing}`;
    container.appendChild(img);
    setTimeout(() => {
      img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(1)`;
    }, 10);
    trail.push({
      element: img,
      rotation: rotation,
      removeTime: Date.now() + config.imageLifespan,
    });
  };

  const removeOldImages = () => {
    const now = Date.now();
    if (now - lastRemovalTime < config.removalDelay || trail.length === 0) return;
    const oldestImage = trail[0];
    if (now >= oldestImage.removeTime) {
      const imgToRemove = trail.shift();
      imgToRemove.element.style.transition = `transform ${config.outDuration}ms ${config.outEasing}`;
      imgToRemove.element.style.transform = `translate(-50%, -50%) rotate(${imgToRemove.rotation}deg) scale(0)`;
      lastRemovalTime = now;
      setTimeout(() => {
        if (imgToRemove.element.parentNode) {
          imgToRemove.element.parentNode.removeChild(imgToRemove.element);
        }
      }, config.outDuration);
    }
  };

  const startAnimation = () => {
    if (!isDesktop) return;
    mouseMoveListener = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isCursorInContainer = isInContainer(mouseX, mouseY);
      if (isCursorInContainer && hasMovedEnough()) {
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        createImage();
      }
    };
    document.addEventListener("mousemove", mouseMoveListener);
    const animate = () => {
      removeOldImages();
      animationId = requestAnimationFrame(animate);
    };
    animate();
  };

  const stopAnimation = () => {
    if (mouseMoveListener) {
      document.removeEventListener("mousemove", mouseMoveListener);
      mouseMoveListener = null;
    }
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    trail.forEach((item) => {
      if (item.element.parentNode) {
        item.element.parentNode.removeChild(item.element);
      }
    });
    trail.length = 0;
  };

  const handleResize = () => {
    const wasDesktop = isDesktop;
    isDesktop = window.innerWidth > 1000;
    if (isDesktop && !wasDesktop) {
      startAnimation();
    } else if (!wasDesktop && isDesktop) {
      stopAnimation();
    }
  };

  // ============================================
  // ENHANCE FORM INPUTS
  // ============================================
  
  const enhanceFormInputs = () => {
    const inputs = document.querySelectorAll(".form-group input, .form-group textarea, .form-group select");
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement.style.transform = "translateY(-2px)";
      });
      input.addEventListener("blur", () => {
        input.parentElement.style.transform = "";
      });
    });
  };

  // ============================================
  // FORM SUBMISSION - Formspree with AJAX (FIXED)
  // ============================================
  
  // Flag to prevent multiple submissions
  let isSubmitting = false;
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    const form = e.target;
    const submitBtn = document.getElementById("submitBtn");
    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");
    
    // Hide any previous messages
    successMessage.classList.remove("show");
    errorMessage.classList.remove("show");
    
    // Get form data
    const formData = {
      first_name: document.getElementById("firstName")?.value || "",
      last_name: document.getElementById("lastName")?.value || "",
      email: document.getElementById("email")?.value || "",
      phone: document.getElementById("phone")?.value || "",
      project_type: document.getElementById("projectType")?.value || "",
      message: document.getElementById("message")?.value || "",
    };

    // Validate email
    if (!formData.email || !formData.email.includes("@")) {
      showError("Please enter a valid email address");
      return;
    }

    // Validate required fields
    if (!formData.first_name || !formData.last_name || !formData.message) {
      showError("Please fill in all required fields");
      return;
    }

    // Set submitting flag
    isSubmitting = true;
    
    // Disable button and show sending state
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    submitBtn.style.transform = "translateY(-1px)";

    try {
      // Send to Formspree
      const response = await fetch("https://formspree.io/f/xdaqdoek", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Success!
        showSuccess();
        form.reset(); // Reset all form fields
      } else {
        // Server error
        const data = await response.json();
        showError(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form Error:", error);
      showError("Network error. Please check your connection and try again.");
    } finally {
      // Reset button
      submitBtn.textContent = "Send Message";
      submitBtn.disabled = false;
      submitBtn.style.transform = "";
      // Reset submitting flag after 2 seconds
      setTimeout(() => {
        isSubmitting = false;
      }, 2000);
    }
  };

  // ============================================
  // UI HELPERS
  // ============================================
  
  function showSuccess() {
    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");
    if (errorMessage) errorMessage.classList.remove("show");
    if (successMessage) {
      successMessage.classList.add("show");
      setTimeout(() => {
        successMessage.classList.remove("show");
      }, 6000);
    }
  }

  function showError(message) {
    const errorMessage = document.getElementById("errorMessage");
    const successMessage = document.getElementById("successMessage");
    if (successMessage) successMessage.classList.remove("show");
    
    if (errorMessage) {
      errorMessage.querySelector("p").textContent = message || "Something went wrong. Please try again.";
      errorMessage.classList.add("show");
      setTimeout(() => {
        errorMessage.classList.remove("show");
      }, 8000);
    }
  }

  // ============================================
  // INITIALIZE
  // ============================================
  
  window.addEventListener("resize", handleResize);
  createFloatingElements();
  enhanceFormInputs();
  
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  }
  
  if (isDesktop) {
    startAnimation();
  }
});