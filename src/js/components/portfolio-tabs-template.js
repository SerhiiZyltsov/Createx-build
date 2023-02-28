const portfolioTabsNav = document.querySelector('.portfolio-tabs-nav');
const portfolioTabsItems = document.querySelectorAll('.porfolio-tabs__item');
const portfolioTabsBtns = document.querySelectorAll('.portfolio-tabs-nav__btn');
const portfolioTabsItemsVisible = document.querySelectorAll('.porfolio-tabs__item--visible');

if (portfolioTabsNav) {

  portfolioTabsNav.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('portfolio-tabs-nav__btn')) {
      const path = target.dataset.path;

      portfolioTabsBtns.forEach(el => {
        el.classList.remove('portfolio-tabs-nav__btn--active');
      });
      target.classList.add('portfolio-tabs-nav__btn--active');

      portfolioTabsItems.forEach(el => {
        el.classList.remove('porfolio-tabs__item--visible');
      });

      document.querySelectorAll(`[data-target="${path}"]`).forEach(el => {
        el.closest('.porfolio-tabs__item').classList.add('porfolio-tabs__item--visible');
      });

      if (path == 'all') {
        portfolioTabsItems.forEach(el => {
          el.classList.add('porfolio-tabs__item--visible');
        });
      }
    }
  });

};