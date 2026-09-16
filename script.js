(() => {
  const header = document.querySelector('.site-header');
  const links = [...document.querySelectorAll('[data-section-link]')];
  const sections = links.map((link) => document.getElementById(link.dataset.sectionLink)).filter(Boolean);
  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  if ('IntersectionObserver' in window && links.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((link) => link.setAttribute('aria-current', link.dataset.sectionLink === visible.target.id ? 'true' : 'false'));
    }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, 0.25, 0.6] });
    sections.forEach((section) => observer.observe(section));
  }
})();
