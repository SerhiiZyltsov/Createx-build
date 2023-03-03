import SmoothScroll from 'smooth-scroll';

// const scroll = new SmoothScroll('a[href*="#"]');
const scrollTop = new SmoothScroll('.to-top');
const scrollToTop = document.querySelector('.to-top');
let heroHeight = document.querySelector('.hero').offsetHeight;

const inVisibleToTop = (y = 0) => {
  if (y >= heroHeight) {
    scrollToTop.classList.add('to-top--active');
  } else {
    scrollToTop.classList.remove('to-top--active');
  }
}

window.addEventListener('scroll', () => {
  let y = window.scrollY;

  inVisibleToTop(y);
});


