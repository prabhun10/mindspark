// ===== Mind Spark Academy — Interactions =====
(function () {
  // Year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Header scroll state
  const header = document.getElementById("siteHeader");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  hamburger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    hamburger.classList.toggle("open", open);
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      hamburger.classList.remove("open");
    })
  );

  // Hero slider
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll("#heroDots .dot");
  let idx = 0;
  const goTo = (i) => {
    slides[idx].classList.remove("active");
    dots[idx].classList.remove("active");
    idx = (i + slides.length) % slides.length;
    slides[idx].classList.add("active");
    dots[idx].classList.add("active");
  };
  let timer = setInterval(() => goTo(idx + 1), 5000);
  dots.forEach((d) =>
    d.addEventListener("click", () => {
      goTo(parseInt(d.dataset.i, 10));
      clearInterval(timer);
      timer = setInterval(() => goTo(idx + 1), 5000);
    })
  );

  // Reveal on scroll
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // Contact form
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const phone = (data.get("phone") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const course = (data.get("course") || "").toString().trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneOk = /^[0-9+ ]{7,}$/.test(phone);
    if (!name || !phoneOk || !emailOk || !course) {
      status.textContent = "Please fill in all fields with valid details.";
      status.className = "form-status err";
      return;
    }
    status.textContent = "Thank you! We'll contact you shortly.";
    status.className = "form-status ok";
    form.reset();
  });
})();
