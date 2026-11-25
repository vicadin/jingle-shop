import '@/style.css';
import mobileMenu from './scripts/modules/mobileMenu';
import { initCatalog } from './scripts/modules/initCatalog';

mobileMenu();

const catalog = document.getElementById('catalog');
if (catalog) {
  initCatalog(catalog);
}
