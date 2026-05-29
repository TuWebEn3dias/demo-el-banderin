(function(){
  'use strict';

  const nav = document.getElementById('navbar');
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  let lastScroll = 0;

  if (toggle && menu) {
    toggle.addEventListener('click', function() {
      const open = menu.classList.toggle('open');
      toggle.classList.toggle('active');
      toggle.setAttribute('aria-expanded', open);
    });

    document.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        menu.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  window.addEventListener('scroll', function() {
    var current = window.pageYOffset;
    if (current > nav.offsetHeight + 40) {
      if (current > lastScroll) {
        nav.classList.add('hidden');
      } else {
        nav.classList.remove('hidden');
      }
    } else {
      nav.classList.remove('hidden');
    }
    lastScroll = current;

    var sections = document.querySelectorAll('section[id]');
    var currentSection = '';
    sections.forEach(function(section) {
      var top = section.offsetTop - nav.offsetHeight - 80;
      if (window.pageYOffset >= top) {
        currentSection = section.getAttribute('id');
      }
    });
    document.querySelectorAll('.nav-link').forEach(function(link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  });

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in').forEach(function(el) {
    observer.observe(el);
  });

  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = document.getElementById('name').value.trim();
      var people = document.getElementById('people').value.trim();
      var date = document.getElementById('date').value.trim();
      var time = document.getElementById('time').value.trim();
      var message = document.getElementById('message').value.trim();

      if (!name || !people || !date || !time) return;

      var text = 'Hola! Quiero reservar una mesa:' +
        '\nNombre: ' + name +
        '\nPersonas: ' + people +
        '\nFecha: ' + date +
        '\nHorario: ' + time;
      if (message) text += '\nMensaje: ' + message;

      var waUrl = 'https://wa.me/5491170542251?text=' + encodeURIComponent(text);
      window.open(waUrl, '_blank');
    });
  }
})();
