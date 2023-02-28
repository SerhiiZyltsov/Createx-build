
var bodyStyles = window.getComputedStyle(document.body);
var gap = parseInt(bodyStyles.getPropertyValue('--grid-gap'));

const heroBg = new Swiper('.hero-img', {
  loop: true,
  speed: 1600,
  parallax: true,
});

const heroText = new Swiper('.hero-text', {
  loop: true,
  speed: 3000,
  pagination: {
    el: '.hero-text__pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.hero-text-button-next',
    prevEl: '.hero-text-button-prev',
  },
});

heroText.controller.control = heroBg;
heroBg.controller.control = heroText;




const portfolioSlider = new Swiper('.portfolio-section__items', {
  slidesPerView: 3,
  spaceBetween: gap,
  loop: true,
  navigation: {
    nextEl: '.portfolio-section__next',
    prevEl: '.portfolio-section__prev',
  },
});

const testimonialSlider = new Swiper('.testimonials__items', {
  slidesPerView: 1,
  spaceBetween: gap,
  loop: true,
  navigation: {
    nextEl: '.testimonials__next',
    prevEl: '.testimonials__prev',
  },
});

const relatedSlider = new Swiper('.related-projects__items', {
  slidesPerView: 3,
  spaceBetween: gap,
  loop: true,
  navigation: {
    nextEl: '.related-projects__next',
    prevEl: '.related-projects__prev',
  },
});

const historySlider = document.querySelector('.history-slider');

if (historySlider) {

  const workSlider = new Swiper(historySlider, {
    slidesPerView: 1,
    spaceBetween: gap,
    navigation: {
      nextEl: '.history__next',
      prevEl: '.history__prev',
    },
  });

  workSlider.on('slideChange', function () {
    console.log(workSlider.realIndex);

    historyBtns.forEach(el => {
      el.classList.remove('history-nav__btn--active');
    });

    document.querySelector(`.history-nav__btn[data-index="${workSlider.realIndex}"]`).classList.add('history-nav__btn--active');

  });

  const historyBtns = document.querySelectorAll('.history-nav__btn');

  historyBtns.forEach((el, idx) => {
    el.setAttribute('data-index', idx);

    el.addEventListener('click', (e) => {
      const index = e.currentTarget.dataset.index;

      historyBtns.forEach(el => {
        el.classList.remove('history-nav__btn--active');
      });

      e.currentTarget.classList.add('history-nav__btn--active');

      workSlider.slideTo(index);

    });

  });

};
