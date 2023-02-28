const selects = document.querySelectorAll('.field-form__select');

selects.forEach(el => {
  new Choices(el, {
    searchEnabled: false,
    shouldSort: false,
    position: 'bottom',
  });
});



