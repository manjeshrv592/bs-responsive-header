('use strict');
/////////////////////////////////////////
// DOM SELECTION
const header = document.querySelector('.c-header');
const toggler = document.querySelector('.c-toggler');
const navLinks = document.querySelectorAll('.c-menu-link');
const hero = document.querySelector('.hero');
const headerHeight = header.getBoundingClientRect().height;

// FUNCTIONS
const toggleHeader = () => header.classList.toggle('open');

const closeHeader = () => header.classList.remove('open');

const fixedNav = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) header.classList.add('fixed');
  if (entry.isIntersecting) header.classList.remove('fixed');
};

// EVENT LISTENER
// Toggle header
toggler.addEventListener('click', toggleHeader);

// Close header when clicked on nav-links
navLinks.forEach(link => link.addEventListener('click', closeHeader));

// Fix header when scrolled past hero section
const fixedNavOpt = {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
};

const heroObserver = new IntersectionObserver(fixedNav, fixedNavOpt);

if (hero) heroObserver.observe(hero);

////////////////////////////////////////////////
// Theme mode

const themeToggler = document.getElementById('theme-toggler');

const getStoredTheme = () => localStorage.getItem('theme');
const setStoredTheme = theme => localStorage.setItem('theme', theme);

const getPreferredTheme = () => {
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const setTheme = theme => {
  if (
    theme === 'auto' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }
};

setTheme(getPreferredTheme());

themeToggler.addEventListener('click', () => {
  const currentTheme = document.documentElement.dataset.bsTheme;
  const theme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(theme);
});
