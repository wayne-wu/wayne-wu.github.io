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
})();
