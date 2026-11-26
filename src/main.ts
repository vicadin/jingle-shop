import '@/style.css';
import mobileMenu from './scripts/modules/mobileMenu';
import { initCatalog } from './scripts/modules/initCatalog';
import { timer } from './scripts/components/Timer';
import { sectionBestRender } from './scripts/components/SectionBest';

mobileMenu();

const catalog = document.getElementById('catalog');
if (catalog) {
  initCatalog(catalog);
}

const timerContainer = document.getElementById('timer');

if (timerContainer) {
  timerContainer.replaceChildren(timer());
}

const cards = document.getElementById('cards');
console.log(cards);
if (cards) {
  sectionBestRender(cards);
}
