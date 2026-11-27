import type { CartItem } from '@/scripts/types/cart.ts';
import { calculateOrderSummary } from '@/scripts/utils/cart';
import { escapeHtml, formatPrice } from '@/scripts/utils/format';

export interface CartPageRenderOptions {
  appliedPromoCode: string | null;
  promoInputValue: string;
  promoMessage: string | null;
  promoStatus: 'success' | 'error' | null;
  checkoutNotice: string | null;
}

const TRASH_ICON = `
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M3 6h18" />
    <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
  </svg>
`;

const GIFT_ICON = `
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13" />
    <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
  </svg>
`;

const DELIVERY_ICON = `
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M10 17h4V5H2v12h3" />
    <path d="M14 9h4l4 4v4h-3" />
    <circle cx="7.5" cy="17.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
`;

const SHIELD_ICON = `
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
`;

function renderCartItemRow(item: CartItem): string {
  const id = escapeHtml(item.product.id);
  const name = escapeHtml(item.product.name);
  const category = escapeHtml(item.product.category);
  const imageSrc = escapeHtml(item.product.image ?? '/images/logo.svg');
  const lineTotal = item.product.price * item.quantity;

  return `
    <li class="cart-page-item" data-cart-page-id="${id}">
      <div class="cart-page-item__media">
        <img class="cart-page-item__img" src="${imageSrc}" alt="${name}" loading="lazy" />
      </div>

      <div class="cart-page-item__info">
        <h2 class="cart-page-item__name">${name}</h2>
        <p class="cart-page-item__category">${category}</p>
        <p class="cart-page-item__unit-price">${formatPrice(item.product.price)}</p>
      </div>

      <div class="cart-page-item__controls">
        <div class="cart-page-stepper">
          <button
            type="button"
            class="cart-page-step-btn"
            aria-label="Decrease quantity of ${name}"
            data-cart-page-dec="${id}"
            ${item.quantity <= 1 ? 'disabled' : ''}
          >
            &minus;
          </button>
          <span class="cart-page-qty">${item.quantity}</span>
          <button
            type="button"
            class="cart-page-step-btn"
            aria-label="Increase quantity of ${name}"
            data-cart-page-inc="${id}"
          >
            +
          </button>
        </div>

        <span class="cart-page-item__subtotal">${formatPrice(lineTotal)}</span>

        <button
          type="button"
          class="cart-page-remove-btn"
          aria-label="Remove ${name} from cart"
          data-cart-page-remove="${id}"
        >
          ${TRASH_ICON}
        </button>
      </div>
    </li>
  `;
}

export function renderCartPage(items: readonly CartItem[], options: CartPageRenderOptions): string {
  const summary = calculateOrderSummary(items, options.appliedPromoCode);

  const itemsPanelMarkup =
    items.length === 0
      ? `
        <div class="cart-page-empty">
          <h2 class="cart-page-empty__title">Your cart is empty</h2>
          <p class="cart-page-empty__text">
            Explore our festive collection and add gifts to your cart to get started.
          </p>
          <a href="gifts.html" class="btn cart-page-empty__btn">Explore Gifts</a>
        </div>
      `
      : `
        <ul class="cart-page-list">
          ${items.map(renderCartItemRow).join('')}
        </ul>
        <div class="cart-items-footer">
          <a href="gifts.html" class="cart-continue-link">
            <span aria-hidden="true">&larr;</span>
            <span>Continue Shopping</span>
          </a>
          <button type="button" class="cart-clear-btn" id="clear-cart-btn">
            ${TRASH_ICON}
            <span>Clear Cart</span>
          </button>
        </div>
      `;

  const discountRow =
    summary.discount > 0 && summary.appliedPromoCode
      ? `
        <div class="order-summary__row order-summary__row--discount">
          <span>Discount (${escapeHtml(summary.appliedPromoCode)} -10%)</span>
          <span>-${formatPrice(summary.discount)}</span>
        </div>
      `
      : '';

  const promoFeedback = options.promoMessage
    ? `
      <p class="order-promo-message ${options.promoStatus === 'error' ? 'is-error' : 'is-success'}" role="status">
        ${escapeHtml(options.promoMessage)}
      </p>
    `
    : '';

  const checkoutFeedback = options.checkoutNotice
    ? `
      <p class="order-checkout-notice" role="status">
        ${escapeHtml(options.checkoutNotice)}
      </p>
    `
    : '';

  return `
    <div class="cart-page-grid">
      <div class="cart-items-panel">
        ${itemsPanelMarkup}
      </div>

      <aside class="order-summary-card" aria-label="Order summary">
        <h2 class="order-summary__title">Order Summary</h2>

        <div class="order-summary__rows">
          <div class="order-summary__row">
            <span>Items (${summary.itemCount})</span>
            <span>${formatPrice(summary.itemsSubtotal)}</span>
          </div>
          <div class="order-summary__row">
            <span class="order-summary__shipping-label">
              Shipping
              <span class="order-summary__info" title="Flat-rate worldwide holiday shipping">i</span>
            </span>
            <span>${formatPrice(summary.shipping)}</span>
          </div>
          ${discountRow}
        </div>

        <form class="order-promo-form" id="promo-form">
          <label class="visually-hidden" for="promo-code-input">Promo code</label>
          <input
            type="text"
            id="promo-code-input"
            class="order-promo-input"
            placeholder="Promo code (SALE10)"
            value="${escapeHtml(options.promoInputValue)}"
            ${items.length === 0 ? 'disabled' : ''}
          />
          <button
            type="submit"
            class="order-promo-btn"
            ${items.length === 0 ? 'disabled' : ''}
          >
            Apply
          </button>
        </form>
        ${promoFeedback}

        <div class="order-summary__divider"></div>

        <div class="order-summary__total-row">
          <span>Total</span>
          <span class="order-summary__total-value">${formatPrice(summary.total)}</span>
        </div>

        <button
          type="button"
          class="btn order-checkout-btn"
          id="checkout-btn"
          ${items.length === 0 ? 'disabled' : ''}
        >
          Proceed to Checkout &rarr;
        </button>
        ${checkoutFeedback}

        <ul class="order-benefits">
          <li class="order-benefit">
            <span class="order-benefit__icon">${GIFT_ICON}</span>
            <div>
              <p class="order-benefit__title">Gift-ready packaging</p>
              <p class="order-benefit__desc">Beautiful wrapping for every order</p>
            </div>
          </li>
          <li class="order-benefit">
            <span class="order-benefit__icon">${DELIVERY_ICON}</span>
            <div>
              <p class="order-benefit__title">Fast &amp; reliable delivery</p>
              <p class="order-benefit__desc">Worldwide shipping</p>
            </div>
          </li>
          <li class="order-benefit">
            <span class="order-benefit__icon">${SHIELD_ICON}</span>
            <div>
              <p class="order-benefit__title">Secure payment</p>
              <p class="order-benefit__desc">Your data is protected</p>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  `;
}
