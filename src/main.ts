import '@/style.css';
// import mobileMenu from './scripts/mobileMenu';
import { timer } from './Timer';

const app = document.getElementById('app');

if (app) {
  app.textContent = 'hi'; // todo
}

// mobileMenu();

const timerContainer = document.getElementById('timer');

if (timerContainer) {
  timerContainer.replaceChildren(timer());
}
