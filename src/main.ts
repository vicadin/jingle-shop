import '@/style.css';
import '@/styles/catalog.css';
import { PRODUCTS, PRODUCT_CATEGORIES } from '@/data/products.ts';
import { renderCatalogSection } from '@/components/catalogSection.ts';

const app = document.getElementById('app');

if (!app) {
  throw new Error('Root element #app was not found');
}

app.innerHTML = `
  <div class="page-shell">
    <header class="site-header">
      <div>
        <h1 class="brand-title">Jingle Shop</h1>
        <p class="brand-subtitle">Christmas goods &amp; winter gifts</p>
      </div>
      <button type="button" class="cart-trigger" id="cart-button">
        Cart (<span id="cart-count">0</span>)
      </button>
    </header>

    <main>
      ${renderCatalogSection(PRODUCTS, PRODUCT_CATEGORIES)}
    </main>
  </div>
`;
