import type { CartItem } from '@/scripts/types/cart.ts';
import { getCartItemCount, getCartTotalPrice } from '@/scripts/utils/cart';
import { escapeHtml, formatPrice } from '@/scripts/utils/format';

export function renderCartDrawerContent(items: readonly CartItem[]): string {
  const totalCount = getCartItemCount(items);
  const totalPrice = getCartTotalPrice(items);

  const bodyMarkup =
    items.length === 0
      ? `<p class="cart-empty">Your cart is empty. Add gifts from the catalog to begin.</p>`
      : `
        <ul class="cart-list">
          ${items
            .map(
              (item) => `
              <li class="cart-item" data-cart-id="${escapeHtml(item.product.id)}">
                <div class="cart-item-top">
                  <div>
                    <p class="cart-item-name">${escapeHtml(item.product.name)}</p>
                    <p class="cart-item-meta">${formatPrice(item.product.price)} each</p>
                  </div>
                  <button
                    type="button"
                    class="cart-remove-btn"
                    data-cart-remove="${escapeHtml(item.product.id)}"
                  >
                    Remove
                  </button>
                </div>

                <div class="cart-item-bottom">
                  <div class="cart-stepper">
                    <button
                      type="button"
                      class="cart-step-btn"
                      aria-label="Decrease quantity of ${escapeHtml(item.product.name)}"
                      data-cart-dec="${escapeHtml(item.product.id)}"
                    >
                      -
                    </button>
                    <span class="cart-qty">${item.quantity}</span>
                    <button
                      type="button"
                      class="cart-step-btn"
                      aria-label="Increase quantity of ${escapeHtml(item.product.name)}"
                      data-cart-inc="${escapeHtml(item.product.id)}"
                    >
                      +
                    </button>
                  </div>
                  <span class="cart-item-subtotal">
                    ${formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              </li>
            `,
            )
            .join('')}
        </ul>
      `;

  return `
    <div class="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title">
      <div class="cart-drawer-header">
        <h2 class="cart-drawer-title" id="cart-drawer-title">Your Cart (${totalCount})</h2>
        <button type="button" class="cart-close-btn" id="cart-close-btn" aria-label="Close cart">
          &times;
        </button>
      </div>

      <div class="cart-drawer-body">
        ${bodyMarkup}
      </div>

      <div class="cart-drawer-footer">
        <div class="cart-total-row">
          <span>Total</span>
          <span class="cart-total-value">${formatPrice(totalPrice)}</span>
        </div>
        <a href="cart.html" class="btn cart-open-page-btn" id="open-cart-page-btn">
          Go to Cart
        </a>
      </div>
    </div>
  `;
}
