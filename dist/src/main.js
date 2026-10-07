import { profile, projects, skillGroups, journey } from "./data/profile.js";

const selectAll = (selector) => [...document.querySelectorAll(selector)];

// Populate profile links
selectAll("[data-github]").forEach((link) => { link.href = profile.github; });
selectAll("[data-linkedin]").forEach((link) => { link.href = profile.linkedin; });
selectAll("[data-resume]").forEach((link) => {
  link.href = profile.resume;
  link.setAttribute("download", "Akash_Samanta_Resume.pdf");
});
selectAll("[data-email]").forEach((link) => { link.href = `mailto:${profile.email}`; });
const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Render Skills
const skillsGrid = document.querySelector("#skills-grid");
if (skillsGrid) {
  skillsGrid.innerHTML = skillGroups.map((group, index) => `
    <article class="skill-card reveal" style="--delay:${index * 60}ms">
      <div class="skill-card-head"><span>0${index + 1}</span><h3>${group.label}</h3></div>
      <ul>${group.items.map((item) => `<li>${item}</li>`).join("")}</ul>
    </article>`).join("");
}

// Render Secondary Project(s)
const projectCard = (project) => `
  <article class="project-card reveal">
    <div class="project-card-top">
      <span class="project-index">0${projects.indexOf(project) + 1}</span>
      <span class="project-kicker">${project.kicker}</span>
    </div>
    <div class="project-card-header">
      <div class="project-icon project-icon-${project.id}" aria-hidden="true"><span>${project.id === "encroachment" ? "◫" : "✦"}</span></div>
      <div>
        <h3>${project.name}</h3>
        <p class="project-card-summary">${project.summary}</p>
      </div>
    </div>
    ${project.workflow ? `
    <div class="architecture-wrap architecture-wrap-card">
      <p class="architecture-label">System pipeline <span>— documented project workflow</span></p>
      <div class="architecture architecture-card-flow">
        ${project.workflow.map((step, index) => `
          <div class="architecture-node"><span>0${index + 1}</span><strong>${step}</strong></div>
          ${index < project.workflow.length - 1 ? "<i aria-hidden='true'>→</i>" : ""}
        `).join("")}
      </div>
    </div>` : ""}
    <div class="project-card-footer">
      <div class="tag-list">${project.technologies.map((tech) => `<span>${tech}</span>`).join("")}</div>
      <button class="project-detail-button" type="button" data-project="${project.id}">View project details <span aria-hidden="true">↗</span></button>
    </div>
  </article>`;

// Render Signature Project
const signature = projects.find((project) => project.signature);
const signatureEl = document.querySelector("#signature-project");
if (signature && signatureEl) {
  signatureEl.innerHTML = `
    <div class="signature-top">
      <div>
        <p class="eyebrow">Signature project / ${signature.kicker}</p>
        <h3>${signature.name}</h3>
        <p class="signature-summary">${signature.summary}</p>
      </div>
      <button class="round-detail-button" type="button" data-project="${signature.id}" aria-label="View ${signature.name} details">↗</button>
    </div>
    <div class="architecture-wrap">
      <p class="architecture-label">How it works <span>— documented project flow</span></p>
      <div class="architecture">
        ${signature.workflow.map((step, index) => `
          <div class="architecture-node"><span>0${index + 1}</span><strong>${step}</strong></div>
          ${index < signature.workflow.length - 1 ? "<i aria-hidden='true'>→</i>" : ""}
        `).join("")}
      </div>
    </div>
    <div class="signature-bottom">
      <div class="tag-list">${signature.technologies.map((tech) => `<span>${tech}</span>`).join("")}</div>
      <div class="signature-actions">
        <p>Built around personal context and accessible daily support.</p>
        <button class="project-detail-button signature-text-btn" type="button" data-project="${signature.id}">View full architecture &amp; details <span aria-hidden="true">↗</span></button>
      </div>
    </div>`;
}

const projectGrid = document.querySelector("#project-grid");
if (projectGrid) {
  projectGrid.innerHTML = projects.filter((project) => !project.signature).map(projectCard).join("");
}

// Render Timeline / Achievements
const timelineEl = document.querySelector("#timeline");
if (timelineEl) {
  timelineEl.innerHTML = journey.map((entry, index) => `
    <li class="timeline-item reveal">
      <div class="timeline-year">${entry.year}</div>
      <div class="timeline-marker"><span>${String(index + 1).padStart(2, "0")}</span></div>
      <div class="timeline-content">
        <p>${entry.organization}</p>
        <h3>${entry.title}</h3>
        <p class="timeline-description">${entry.description}</p>
      </div>
    </li>`).join("");
}

// Project Details Dialog Modal
const dialog = document.querySelector("#project-dialog");
const dialogContent = document.querySelector("#dialog-content");
let lastFocusedElement = null;

const openProject = (id, triggerElement = null) => {
  const project = projects.find((item) => item.id === id);
  if (!project || !dialog || !dialogContent) return;
  lastFocusedElement = triggerElement || document.activeElement;

  dialogContent.innerHTML = `
    <p class="eyebrow">${project.kicker}</p>
    <h2 id="dialog-title">${project.name}</h2>
    <p class="dialog-summary">${project.summary}</p>
    <div class="dialog-grid">
      <section><h3>The problem</h3><p>${project.problem}</p></section>
      <section><h3>The solution</h3><p>${project.solution}</p></section>
      <section><h3>Key capabilities</h3><ul>${project.features.map((feature) => `<li>${feature}</li>`).join("")}</ul></section>
      <section><h3>My contribution</h3><p>${project.contribution}</p></section>
    </div>
    <section class="dialog-flow">
      <h3>Documented workflow</h3>
      <div class="architecture architecture-card-flow">
        ${project.workflow.map((step, index) => `
          <div class="architecture-node"><span>0${index + 1}</span><strong>${step}</strong></div>
          ${index < project.workflow.length - 1 ? "<i aria-hidden='true'>→</i>" : ""}
        `).join("")}
      </div>
    </section>
    <div class="dialog-footer">
      <div class="tag-list">${project.technologies.map((tech) => `<span>${tech}</span>`).join("")}</div>
      <p>${project.verified}</p>
      <a class="text-link" href="${profile.github}" target="_blank" rel="noreferrer">Visit GitHub profile <span>↗</span></a>
    </div>`;

  dialog.showModal();
  document.body.classList.add("modal-open");
  const closeButton = dialog.querySelector(".dialog-close");
  if (closeButton) closeButton.focus();
};

const closeDialog = () => {
  if (dialog && dialog.open) {
    dialog.close();
  }
};

if (dialog) {
  dialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeDialog();
    }
  });
}

const dialogCloseBtn = document.querySelector(".dialog-close");
if (dialogCloseBtn) {
  dialogCloseBtn.addEventListener("click", () => closeDialog());
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-project]");
  if (button) {
    openProject(button.dataset.project, button);
  }
});

// Mobile Navigation
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");

const toggleMenu = (forceState = null) => {
  if (!menuButton || !nav) return;
  const isCurrentlyOpen = menuButton.getAttribute("aria-expanded") === "true";
  const shouldOpen = forceState !== null ? forceState : !isCurrentlyOpen;
  menuButton.setAttribute("aria-expanded", String(shouldOpen));
  nav.classList.toggle("is-open", shouldOpen);
  document.body.classList.toggle("menu-open", shouldOpen);
};

if (menuButton) {
  menuButton.addEventListener("click", () => toggleMenu());
}

// Close mobile navigation on link click
selectAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    toggleMenu(false);
  });
});

// Close mobile menu on Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (nav && nav.classList.contains("is-open")) {
      toggleMenu(false);
      menuButton?.focus();
    }
  }
});

// Close mobile menu on click outside
document.addEventListener("click", (event) => {
  if (nav && nav.classList.contains("is-open") && !event.target.closest(".site-header")) {
    toggleMenu(false);
  }
});

// Ensure menu closes if viewport expands beyond mobile breakpoint
window.addEventListener("resize", () => {
  if (window.innerWidth > 860 && nav && nav.classList.contains("is-open")) {
    toggleMenu(false);
  }
});

// ScrollSpy / Active Link Navigation
const sections = [...document.querySelectorAll("main section[id], #hero")];
const navigationLinks = [...document.querySelectorAll(".nav a[href^='#']")];

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const targetId = entry.target.id;
    navigationLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (targetId === "hero" || targetId === "top") {
        link.removeAttribute("aria-current");
      } else {
        link.toggleAttribute("aria-current", href === `#${targetId}`);
      }
    });
  });
}, { rootMargin: "-20% 0px -55% 0px" });

sections.forEach((section) => navObserver.observe(section));

// Reveal animations on scroll with in-viewport fallback
const revealElements = selectAll(".reveal");
const revealObserver = new IntersectionObserver((entries, observerInstance) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observerInstance.unobserve(entry.target);
    }
  });
}, { threshold: 0.03, rootMargin: "0px 0px -10px 0px" });

revealElements.forEach((el) => {
  revealObserver.observe(el);
  // Check if already in viewport on initial load
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    el.classList.add("is-visible");
  }
});
