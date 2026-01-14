(() => {
  const NAV_TEMPLATES = Object.freeze({
    default: `
<nav class="fh5co-nav" role="navigation">
  <div class="container">
    <div class="fh5co-top-logo">
      <div id="fh5co-logo"><a href="/">Wayne Wu</a></div>
    </div>
    <div class="fh5co-top-menu menu-1 text-center">
      <ul>
        <li><a href="/#projects">Work</a></li>
        <li><a href="/#about">About Me</a></li>
        <li><a href="https://www.dropbox.com/scl/fi/gof9m0a97uhtllpurtwbh/resume-waynewu.pdf?rlkey=31eu4xdklz70laxfmr17s8n63&st=8t9fepue&raw=1" target="_blank">Resume</a></li>
      </ul>
    </div>
    <div class="fh5co-top-social menu-1 text-right">
      <ul class="fh5co-social">
        <li><a href="https://linkedin.com/in/wayne-wu"><i class="icon-linkedin"></i></a></li>
        <li><a href="https://github.com/wayne-wu"><i class="icon-github"></i></a></li>
        <li><a href="mailto:wayne.wuuuu@gmail.com"><i class="icon-mail"></i></a></li>
      </ul>
    </div>
  </div>
</nav>
`,
    contact: `
<nav class="fh5co-nav" role="navigation">
  <div class="container">
    <div class="fh5co-top-logo">
      <div id="fh5co-logo"><a href="/#projects">Shift</a></div>
    </div>
    <div class="fh5co-top-menu menu-1 text-center">
      <ul>
        <li><a href="/work/work">Work</a></li>
        <li><a href="/#about">Profile</a></li>
        <li class="has-dropdown">
          <a href="#">Dropdown</a>
          <ul class="dropdown">
            <li><a href="#">Web Design</a></li>
            <li><a href="#">eCommerce</a></li>
            <li><a href="#">Branding</a></li>
            <li><a href="#">API</a></li>
          </ul>
        </li>
        <li class="active"><a href="/work/contact">Contact</a></li>
      </ul>
    </div>
    <div class="fh5co-top-social menu-1 text-right">
      <ul class="fh5co-social">
        <li><a href="#"><i class="icon-twitter"></i></a></li>
        <li><a href="#"><i class="icon-dribbble"></i></a></li>
        <li><a href="#"><i class="icon-github"></i></a></li>
      </ul>
    </div>
  </div>
</nav>
`,
  });

  const FOOTER_TEMPLATES = Object.freeze({
    default: `
<footer id="fh5co-footer" role="contentinfo">
  <div class="container">
    <div class="row copyright">
      <div class="col-md-12 text-center">
        <p>
          <small class="block">&copy; Wayne Wu</small>
        </p>

        <ul class="fh5co-social-icons">
          <li><a href="https://linkedin.com/in/wayne-wu"><i class="icon-linkedin"></i></a></li>
          <li><a href="https://github.com/wayne-wu"><i class="icon-github"></i></a></li>
          <li><a href="mailto:wayne.wuuuu@gmail.com"><i class="icon-mail"></i></a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>
`,
    contact: `
<footer id="fh5co-footer" role="contentinfo">
  <div class="container">
    <div class="row copyright">
      <div class="col-md-12 text-center">
        <p>
          <small class="block">&copy; 2016 Free HTML5. All Rights Reserved.</small>
          <small class="block">Designed by <a href="http://freehtml5.co/" target="_blank">FreeHTML5.co</a> Demo Images: <a href="http://unsplash.co/" target="_blank">Unsplash</a> &amp; <a href="http://blog.gessato.com/" target="_blank">Gessato</a></small>
        </p>

        <ul class="fh5co-social-icons">
          <li><a href="#"><i class="icon-twitter"></i></a></li>
          <li><a href="#"><i class="icon-facebook"></i></a></li>
          <li><a href="#"><i class="icon-linkedin"></i></a></li>
          <li><a href="#"><i class="icon-dribbble"></i></a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>
`,
  });

  class SiteNav extends HTMLElement {
    connectedCallback() {
      if (this.dataset.rendered) return;
      const variant = (this.getAttribute('variant') || 'default').toLowerCase();
      this.innerHTML = NAV_TEMPLATES[variant] || NAV_TEMPLATES.default;
      this.dataset.rendered = 'true';
    }
  }

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      if (this.dataset.rendered) return;
      const variant = (this.getAttribute('variant') || 'default').toLowerCase();
      this.innerHTML = FOOTER_TEMPLATES[variant] || FOOTER_TEMPLATES.default;
      this.dataset.rendered = 'true';
    }
  }

  class SiteLoader extends HTMLElement {
    connectedCallback() {
      if (this.dataset.rendered) return;
      this.innerHTML = '<div class="fh5co-loader"></div>';
      this.dataset.rendered = 'true';
    }
  }

  class SiteGoToTop extends HTMLElement {
    connectedCallback() {
      if (this.dataset.rendered) return;
      this.innerHTML = '<div class="gototop js-top"><a href="#" class="js-gotop"><i class="icon-arrow-up"></i></a></div>';
      this.dataset.rendered = 'true';
    }
  }

  if (!customElements.get('site-nav')) {
    customElements.define('site-nav', SiteNav);
  }
  if (!customElements.get('site-footer')) {
    customElements.define('site-footer', SiteFooter);
  }
  if (!customElements.get('site-loader')) {
    customElements.define('site-loader', SiteLoader);
  }
  if (!customElements.get('site-gototop')) {
    customElements.define('site-gototop', SiteGoToTop);
  }

  const normalizePath = (path) => {
    let normalized = path.split('#')[0].split('?')[0];
    if (normalized.endsWith('/index.html')) {
      normalized = normalized.slice(0, -'/index.html'.length);
    }
    if (normalized.length > 1 && normalized.endsWith('/')) {
      normalized = normalized.slice(0, -1);
    }
    return normalized;
  };

  const findNavLink = (navRoot, keyword) => {
    const loweredKeyword = keyword.toLowerCase();
    const links = Array.from(navRoot.querySelectorAll('a'));
    return links.find((link) => link.textContent.toLowerCase().includes(loweredKeyword));
  };

  const applyNavLink = (link, href) => {
    if (!link) return;
    if (!href) {
      link.removeAttribute('href');
      link.setAttribute('aria-disabled', 'true');
      link.style.visibility = 'hidden';
      return;
    }
    link.setAttribute('href', href);
    link.removeAttribute('aria-disabled');
    link.style.removeProperty('visibility');
  };

  const updatePortfolioNavigation = async () => {
    const navRoot = document.querySelector('.portfolio-navigation');
    if (!navRoot) return;

    try {
      const response = await fetch('/index.html', { credentials: 'same-origin' });
      if (!response.ok) return;
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const items = Array.from(doc.querySelectorAll('#projects a.work'))
        .map((anchor) => anchor.getAttribute('href'))
        .filter(Boolean)
        .map((href) => ({
          href,
          normalized: normalizePath(new URL(href, window.location.origin).pathname),
        }));

      const current = normalizePath(window.location.pathname);
      const currentIndex = items.findIndex((item) => item.normalized === current);
      if (currentIndex === -1) return;

      const prev = currentIndex > 0 ? items[currentIndex - 1].href : null;
      const next = currentIndex < items.length - 1 ? items[currentIndex + 1].href : null;

      applyNavLink(findNavLink(navRoot, 'prev'), prev);
      applyNavLink(findNavLink(navRoot, 'next'), next);
    } catch (error) {
      return;
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updatePortfolioNavigation);
  } else {
    updatePortfolioNavigation();
  }
})();
