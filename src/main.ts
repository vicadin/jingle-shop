import '@/style.css';
import '@/styles/catalog.css';
import '@/styles/cart.css';
import mobileMenu from './scripts/mobileMenu';
import { initCatalog } from './scripts/catalog';

mobileMenu();

const catalog = document.getElementById('catalog');
if (catalog) {
  initCatalog(catalog);
}
