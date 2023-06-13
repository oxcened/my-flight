export const priceFormatter = new Intl.NumberFormat(navigator.language, {
  style: 'currency',
  currency: 'EUR',
});
