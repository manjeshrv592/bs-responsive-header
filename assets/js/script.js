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
