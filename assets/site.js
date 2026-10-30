(function () {
  var btn = document.querySelector('.abrir-menu');
  var menu = document.querySelector('.menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var aberto = menu.classList.toggle('aberto');
      btn.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });
  }

  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  var els = document.querySelectorAll('.surgir');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visivel'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('visivel'); });
  }

  // Cardápio: destaca a categoria visível, como em apps de delivery
  var chips = document.querySelectorAll('.chips a');
  var cats = document.querySelectorAll('.categoria');
  if (chips.length && cats.length && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        chips.forEach(function (c) {
          var ativo = c.getAttribute('href') === '#' + e.target.id;
          c.classList.toggle('ativo', ativo);
          if (ativo && c.scrollIntoView) c.scrollIntoView({ block: 'nearest', inline: 'center' });
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    cats.forEach(function (c) { obs.observe(c); });
  }
})();
