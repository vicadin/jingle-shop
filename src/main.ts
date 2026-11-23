import '@/style.css';
import mobileMenu from './scripts/mobileMenu';

const app = document.getElementById('app');

if (app) {
  app.textContent = 'hi'; // todo
}

document.addEventListener('DOMContentLoaded', () => {
  mobileMenu();
});
