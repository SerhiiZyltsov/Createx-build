document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('.accordion');

  accordions.forEach(el => {
    el.addEventListener('click', (e) => {
      // находим текущий элемент, текущий аккордеон
      // Event.currentTarget - Определяет элемент, в котором в данный момент обрабатывается 
      // событие, при движении события внутри DOM.Всегда совпадает элементом, на котором 
      // обработчик события был назначен,
      const self = e.currentTarget;

      // Находим текущий элемент на который нажали
      const control = self.querySelector('.accordion__control');
      const content = self.querySelector('.accordion__content');

      self.classList.toggle('open');

      //если открыт аккордеон
      if (self.classList.contains('open')) {
        control.setAttribute('aria-expanded', true);
        content.setAttribute('aria-hidden', false);
        // находим высоту из того что складывается внутри
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        control.setAttribute('aria-expanded', false);
        content.setAttribute('aria-hidden', true);
        // для закрывания просто уберем стиль
        content.style.maxHeight = null;
      };
    });
  });
});