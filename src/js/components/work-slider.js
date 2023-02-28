const galleryThumbs = new Swiper('.work-images__thumbs', {
  spaceBetween: 20,
  slidesPerView: 10,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,

});

const galleryTop = new Swiper('.work-images__slider', {
  spaceBetween: 10,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumbs: {
    swiper: galleryThumbs
  }
});
