// OEOO Philippines website interactions.

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

function setMenuOpen(isOpen) {
  if (!menuButton || !nav) return;

  nav.classList.toggle('open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuButton.textContent = isOpen ? '✕' : '☰';
}

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', event => {
    if (event.target.closest('a')) setMenuOpen(false);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuButton.focus();
    }
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Donation UI is a preview only; it does not collect or process payments.
const amountButtons = document.querySelectorAll('[data-amount]');
const frequencyButtons = document.querySelectorAll('[data-frequency]');
const customAmount = document.getElementById('customAmount');
const donationSummary = document.getElementById('donationSummary');

let amount = 1000;
let frequency = 'once';

function updateSummary() {
  if (!donationSummary) return;

  const formattedAmount = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(amount);
  const frequencyLabel = frequency === 'monthly' ? 'monthly' : 'one-time';

  donationSummary.textContent = `${formattedAmount} · ${frequencyLabel}`;
}

amountButtons.forEach(button => {
  button.setAttribute('aria-pressed', String(button.classList.contains('active')));
  button.addEventListener('click', () => {
    const selectedAmount = Number(button.dataset.amount);
    if (!Number.isFinite(selectedAmount) || selectedAmount < 0) return;

    amount = selectedAmount;
    amountButtons.forEach(item => {
      const isActive = item === button;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });

    if (customAmount) customAmount.value = '';
    updateSummary();
  });
});

frequencyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedFrequency = button.dataset.frequency;
    if (selectedFrequency !== 'once' && selectedFrequency !== 'monthly') return;

    frequency = selectedFrequency;
    frequencyButtons.forEach(item => {
      const isActive = item === button;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });
    updateSummary();
  });
});

if (customAmount) {
  customAmount.addEventListener('input', () => {
    const enteredAmount = Number(customAmount.value);
    amount = customAmount.value === '' || !Number.isFinite(enteredAmount)
      ? 0
      : Math.max(0, enteredAmount);

    amountButtons.forEach(button => {
      button.classList.remove('active');
      button.setAttribute('aria-pressed', 'false');
    });
    updateSummary();
  });
}

updateSummary();
