import { cart } from '../utils/cart.js';

function renderCart(container) {
    const cartHTML = `
        <div class="p-4 pb-24">
            <h1 class="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent" style="animation: fadeInDown 0.8s ease-out;">🛒 Keranjang Belanja</h1>
            <div id="cart-content"></div>
        </div>
    `;
    
    container.innerHTML = cartHTML;
    displayCart();

    function displayCart() {
        const cartContent = container.querySelector('#cart-content');

        if (cart.items.length === 0) {
            cartContent.innerHTML = `
                <div class="text-center py-12">
                    <p class="text-5xl mb-4">🛍️</p>
                    <p class="text-xl text-gray-600 mb-6">Keranjang Anda kosong</p>
                    <p class="text-gray-500">Jelajahi produk kami dan mulai berbelanja!</p>
                </div>
            `;
            return;
        }

        const itemsHTML = cart.items.map((item, index) => {
            const price = parseInt(String(item.produk_price).replace(/[^\d]/g, '')) || 0;
            const itemTotal = price * item.quantity;
            return `
                <div class="card" style="animation-delay: ${index * 0.05}s;">
                    <div class="flex gap-4">
                        <div class="flex-1">
                            <h3 class="text-lg font-bold text-gray-800">${item.produk_name}</h3>
                            <p class="text-sm text-gray-500 mb-2">${item.produk_kategori}</p>
                            <p class="text-lg font-bold text-pink-600 mb-3">Rp ${item.produk_price}</p>
                            
                            <div class="flex items-center gap-2 mb-3">
                                <button class="qty-btn-minus" data-id="${item.produk_id}" class="bg-pink-200 text-pink-600 w-8 h-8 rounded text-sm font-bold">−</button>
                                <input type="number" value="${item.quantity}" min="1" class="qty-input" data-id="${item.produk_id}" class="w-12 text-center px-2 py-1 border rounded" />
                                <button class="qty-btn-plus" data-id="${item.produk_id}" class="bg-pink-200 text-pink-600 w-8 h-8 rounded text-sm font-bold">+</button>
                            </div>
                            
                            <p class="text-sm text-gray-700 mb-3">
                                Subtotal: <span class="font-bold">Rp ${itemTotal.toLocaleString('id-ID')}</span>
                            </p>
                            
                            <button class="remove-btn text-red-500 text-sm font-semibold" data-id="${item.produk_id}">
                                🗑️ Hapus
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        const total = cart.getTotal();
        cartContent.innerHTML = `
            <div class="space-y-4 mb-6">
                ${itemsHTML}
            </div>

            <div class="sticky bottom-0 bg-white p-4 rounded-lg border-t-2 border-pink-300">
                <div class="mb-4">
                    <div class="flex justify-between mb-2 text-gray-700">
                        <span>Subtotal:</span>
                        <span class="font-semibold">Rp ${total.toLocaleString('id-ID')}</span>
                    </div>
                    <div class="flex justify-between mb-3 text-gray-700">
                        <span>Ongkos Kirim:</span>
                        <span class="font-semibold">Rp 10.000</span>
                    </div>
                    <div class="flex justify-between text-xl font-bold text-pink-600 py-3 border-t-2 border-pink-300">
                        <span>Total:</span>
                        <span>Rp ${(total + 10000).toLocaleString('id-ID')}</span>
                    </div>
                </div>
                <button id="checkout-btn" class="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-lg font-bold text-lg hover:shadow-lg transition-all">
                    💳 Lanjut Checkout
                </button>
            </div>
        `;

        setupCartEvents();
    }

    function setupCartEvents() {
        // Quantity buttons
        container.querySelectorAll('.qty-btn-minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const item = cart.items.find(i => i.produk_id === id);
                if (item && item.quantity > 1) {
                    cart.updateQuantity(id, item.quantity - 1);
                    displayCart();
                }
            });
        });

        container.querySelectorAll('.qty-btn-plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const item = cart.items.find(i => i.produk_id === id);
                if (item && item.quantity < parseInt(item.produk_stock)) {
                    cart.updateQuantity(id, item.quantity + 1);
                    displayCart();
                }
            });
        });

        // Remove buttons
        container.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                cart.removeItem(id);
                displayCart();
            });
        });

        // Checkout button
        const checkoutBtn = container.querySelector('#checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                window.location.hash = '#pesanan';
            });
        }
    }
}

export { renderCart };
