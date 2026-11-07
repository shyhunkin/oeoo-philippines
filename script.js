// OEOO Philippines website — mobile navigation and donation preview.
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.textContent = isOpen ? '✕' : '☰';
  });
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Donation UI is deliberately a preview. It does NOT collect or process payments.
const amountButtons = document.querySelectorAll('[data-amount]');
const frequencyButtons = document.querySelectorAll('[data-frequency]');
const customAmount = document.getElementById('customAmount');
const donationSummary = document.getElementById('donationSummary');
let amount = 1000;
let frequency = 'once';
function updateSummary() {
  if (!donationSummary) return;
  const formatted = new Intl.NumberFormat('en-PH', {
    style: 'currency', currency: 'PHP', maximumFractionDigits: 0
  }).format(amount || 0);
  donationSummary.textContent = formatted + (frequency === 'monthly' ? ' · monthly' : ' · one-time');
}
amountButtons.forEach(button => {
  button.addEventListener('click', () => {
    amount = Number(button.dataset.amount);
    amountButtons.forEach(item => item.classList.toggle('active', item === button));
    if (customAmount) customAmount.value = '';
    updateSummary();
  });
});
frequencyButtons.forEach(button => {
  button.addEventListener('click', () => {
    frequency = button.dataset.frequency;
    frequencyButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    updateSummary();
  });
});
if (customAmount) {
  customAmount.addEventListener('input', () => {
    amount = Math.max(0, Number(customAmount.value) || 0);
    amountButtons.forEach(item => item.classList.remove('active'));
    updateSummary();
  });
}
updateSummary();
