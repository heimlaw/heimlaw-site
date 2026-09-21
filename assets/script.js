(() => {
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-button]");
  const menu = document.querySelector("[data-menu]");
  const config = window.HEIMLAW_CONFIG || {};

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  const closeMenu = () => {
    if (!menuButton || !menu) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.querySelector(".sr-only").textContent = "메뉴 열기";
    menu.classList.remove("is-open");
    header?.classList.remove("is-menu-open");
    document.body.classList.remove("menu-open");
  };

  menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.querySelector(".sr-only").textContent = isOpen ? "메뉴 열기" : "메뉴 닫기";
    menu?.classList.toggle("is-open", !isOpen);
    header?.classList.toggle("is-menu-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("scroll", updateHeader, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  if (config.phoneDisplay && config.phoneHref) {
    const tel = config.phoneHref.startsWith("tel:") ? config.phoneHref : `tel:${config.phoneHref}`;
    document.querySelectorAll('[data-contact="phone-link"], [data-contact="phone-link-footer"]').forEach((link) => {
      link.textContent = config.phoneDisplay;
      link.href = tel;
    });
    document.querySelectorAll('[data-contact="phone"], [data-contact="phone-row"], [data-contact="phone-row-footer"]').forEach((item) => {
      item.hidden = false;
    });
    const phoneButton = document.querySelector('[data-contact="phone"]');
    if (phoneButton) phoneButton.href = tel;
  }

  if (config.consultationHours) {
    const hours = document.querySelector('[data-contact="hours"]');
    const row = document.querySelector('[data-contact="hours-row"]');
    if (hours && row) {
      hours.textContent = config.consultationHours;
      row.hidden = false;
    }
  }

  document.querySelectorAll("[data-year]").forEach((item) => {
    item.textContent = new Date().getFullYear();
  });

  updateHeader();
})();
