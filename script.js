/**
 * Core interactivity and initialization
 */

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const lenis = !reduceMotion.matches && window.Lenis ? new window.Lenis() : null;

  if (lenis) {
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }

  const header = document.querySelector("header");
  let headerOffset = header ? header.offsetHeight : 0;

  const refreshHeaderOffset = () => {
    headerOffset = header ? header.offsetHeight : 0;
  };

  refreshHeaderOffset();
  window.addEventListener("resize", refreshHeaderOffset);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(0);
        } else {
          window.scrollTo({
            top: 0,
            behavior: reduceMotion.matches ? "auto" : "smooth",
          });
        }
        return;
      }

      e.preventDefault();
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        if (lenis) {
          lenis.scrollTo(targetElement, { offset: -headerOffset });
        } else {
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: reduceMotion.matches ? "auto" : "smooth",
          });
        }
      }
    });
  });

  if (reduceMotion.matches) {
    document.querySelectorAll(".section-fade").forEach((section) => {
      section.classList.add("section-visible");
    });
    return;
  }

  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".section-fade").forEach((section) => {
    observer.observe(section);
  });
});
