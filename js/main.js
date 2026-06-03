(function () {
  'use strict';

  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('header--scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('nav--open');
      burger.classList.toggle('burger--open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
      burger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav--open');
        burger.classList.remove('burger--open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (formSuccess) {
        formSuccess.hidden = false;
        contactForm.reset();
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  var revealSelectors = [
    '.section__header',
    '.service-item',
    '.pricing__main',
    '.pricing__cta',
    '.engagement',
    '.showcase',
    '.zone-banner',
    '.faq__item',
    '.card',
    '.steps li',
    '.page-hero__body',
    '.contact-info',
    '.contact-form'
  ].join(', ');

  var revealEls = document.querySelectorAll(revealSelectors);
  if (revealEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealEls.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 6) * 80 + 'ms';
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  }
})();
