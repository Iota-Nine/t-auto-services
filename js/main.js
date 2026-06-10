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

  var reviewsTrack = document.getElementById('reviews-track');
  if (reviewsTrack) {
    var reviews = [
      { name: 'mehdi_k92', place: 'Nanterre', service: 'Enlèvement', text: 'top merci bcp', short: true },
      { name: 'Sophie', place: 'Paris 15e', service: 'Enlèvement', text: 'Epave enlevée dans la semaine, devis respecté au tel. Merci !' },
      { name: 'TomCreteil', place: 'Créteil', service: 'Transport', text: 'tres pro rapide nickel', short: true },
      { name: 'Karim', place: 'Boulogne', service: 'Enlèvement', text: 'reponse rapide gars sympa je recommande' },
      { name: 'nadou_78', place: 'Versailles', service: 'Enlèvement', text: 'Enlevement epave sur devis comme promis. Rien a redire merci' },
      { name: 'Marie', place: 'Montreuil', service: 'Enlèvement', text: 'Appel le matin, venu vite, super' },
      { name: 'aicha.sd93', place: 'Saint-Denis', service: 'Transport', text: 'Parfait.', short: true },
      { name: 'Lucas', place: 'Évry', service: 'Transport', text: 'nickel merci', short: true },
      { name: 'jp_boul92', place: 'Boulogne', service: 'Enlèvement', text: 'Devis clair, RAS merci' },
      { name: 'Claire', place: 'Versailles', service: 'Transport', text: 'Ma clio transportée sans souci. Merci !' },
      { name: 'fatima_b', place: 'Cergy', service: 'Enlèvement', text: 'top', short: true },
      { name: 'Yann', place: 'Melun', service: 'Transport', text: 'Super service merci bcp' },
      { name: 'soph_paris15', place: 'Paris 11e', service: 'Enlèvement', text: 'Disponible direct, rien a dire merci' },
      { name: 'Bruno', place: 'Nanterre', service: 'Transport', text: 'Serieux et rapide je conseille' },
      { name: 'leila_93', place: 'Bobigny', service: 'Enlèvement', text: 'Merci encore', short: true },
      { name: 'Antoine', place: 'Créteil', service: 'Transport', text: 'Camion propre chauffeur cool. 5/5' }
    ];

    function buildCard(review) {
      var textClass = review.short ? ' review-card__text--short' : '';
      return '<article class="review-card">' +
        '<div class="review-card__stars" aria-hidden="true">★★★★★</div>' +
        '<blockquote class="review-card__text' + textClass + '">' + review.text + '</blockquote>' +
        '<footer class="review-card__author">' +
        '<strong>' + review.name + '</strong>' +
        '<span>' + review.place + ' · ' + review.service + '</span>' +
        '</footer></article>';
    }

    for (var i = reviews.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = reviews[i];
      reviews[i] = reviews[j];
      reviews[j] = temp;
    }

    var html = reviews.map(buildCard).join('');
    reviewsTrack.innerHTML = html + html;
  }
})();
