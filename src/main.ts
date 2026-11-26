import '@/style.css';
import mobileMenu from './scripts/modules/mobileMenu';
import { initCatalog } from './scripts/modules/initCatalog';
// import mobileMenu from './scripts/mobileMenu';
import { timer } from './Timer';

mobileMenu();

const catalog = document.getElementById('catalog');
if (catalog) {
  initCatalog(catalog);
}

// mobileMenu();

const timerContainer = document.getElementById('timer');

if (timerContainer) {
  timerContainer.replaceChildren(timer());
}
