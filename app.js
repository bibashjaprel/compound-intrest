// app.js - Compound Interest Calculator modular JS

// ===============================
// Calculation logic
// ===============================
/**
 * Calculate compound interest and total amount
 * @param {number} principal - The initial amount
 * @param {number} rate - Annual interest rate (%)
 * @param {number} years - Time in years
 * @param {number} frequency - Compounding frequency per year
 * @returns {{total: number, interest: number}}
 */
function calculateCompoundInterest(principal, rate, years, frequency) {
  const r = rate / 100;
  const n = frequency;
  const t = years;
  const A = principal * Math.pow((1 + r / n), n * t);
  const CI = A - principal;
  return { total: A, interest: CI };
}

// ===============================
// Input validation logic
// ===============================
/**
 * Validate user inputs for the calculator
 * @returns {Object} errors - Error messages for each field
 */
function validateInputs(principal, rate, years, frequency) {
  const errors = {};
  if (isNaN(principal) || principal <= 0) {
    errors.principal = 'Enter a valid principal (> 0)';
  }
  if (isNaN(rate) || rate <= 0) {
    errors.rate = 'Enter a valid rate (> 0)';
  }
  if (isNaN(years) || years <= 0) {
    errors.years = 'Enter a valid time (> 0)';
  }
  if (isNaN(frequency) || frequency < 1) {
    errors.frequency = 'Enter a valid frequency (>= 1)';
  }
  return errors;
}

// ===============================
// UI helper functions
// ===============================
/**
 * Show error message for a field
 */
function showError(id, message) {
  document.getElementById(id).textContent = message;
}
/**
 * Show all error messages
 */
function showErrors(errors) {
  showError('principal-error', errors.principal || '');
  showError('rate-error', errors.rate || '');
  showError('years-error', errors.years || '');
  showError('frequency-error', errors.frequency || '');
}
/**
 * Clear all error messages
 */
function clearErrors() {
  showErrors({});
}
/**
 * Format a number as currency
 */
function formatMoney(num) {
  return Number(num).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ===============================
// Main event logic
// ===============================
const form = document.getElementById('calc-form');
const resultDiv = document.getElementById('result');
const totalAmountSpan = document.getElementById('total-amount');
const compoundInterestSpan = document.getElementById('compound-interest');

// Handle form submission and calculation
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const principal = parseFloat(document.getElementById('principal').value);
  const rate = parseFloat(document.getElementById('rate').value);
  const years = parseInt(document.getElementById('years').value, 10);
  const frequency = parseInt(document.getElementById('frequency').value, 10);
  const errors = validateInputs(principal, rate, years, frequency);
  if (Object.keys(errors).length > 0) {
    showErrors(errors);
    resultDiv.style.display = 'none';
    return;
  }
  clearErrors();
  const { total, interest } = calculateCompoundInterest(principal, rate, years, frequency);
  totalAmountSpan.textContent = 'NPR' + formatMoney(total);
  compoundInterestSpan.textContent = 'NPR' + formatMoney(interest);
  resultDiv.style.display = 'flex';
});

// ===============================
// Dark mode toggle logic
// ===============================
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleIcon = document.getElementById('theme-toggle-icon');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

/**
 * Set the theme (dark or light)
 */
function setTheme(dark) {
  document.body.classList.toggle('dark', dark);
  themeToggleIcon.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

/**
 * Get stored theme from localStorage
 */
function getStoredTheme() {
  return localStorage.getItem('theme');
}

/**
 * Apply stored or system theme on load
 */
function applyStoredOrSystemTheme() {
  const stored = getStoredTheme();
  if (stored === 'dark') setTheme(true);
  else if (stored === 'light') setTheme(false);
  else setTheme(prefersDark);
}

// Toggle theme on button click
themeToggleBtn.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark');
  setTheme(!isDark);
});

// Initialize theme on page load
applyStoredOrSystemTheme();
