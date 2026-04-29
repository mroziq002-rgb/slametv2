import { favorites } from '../utils/favorites.js';
import { cart } from '../utils/cart.js';

function renderFavorites(container) {
    const favoritesHTML = `
        <div class="p-4 pb-24">
            <h1 class="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent" style="animation: fadeInDown 0.8s ease-out;">❤️ Favorit Saya</h1>
            <div id="favorites-content"></div>
        </div>

        <!-- Order Modal -->
        <div id="order-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
            <div class="bg-white w-full rounded-t-3xl p-6 animate-slideUp max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-bold text-gray-800">Pesan Produk</h2>
                    <button id="close-modal" class="text-3xl text-gray-400 hover:text-gray-600">✕</button>
                </div>

                <div id="modal-content"></div>

                <div class="mt-6 sticky bottom-0 bg-white border-t pt-4">
                    <div class="mb-4">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Jumlah:</label>
                        <div class="flex items-center gap-3">
                            <button id="qty-minus" class="bg-pink-200 text-pink-600 w-10 h-10 rounded-lg font-bold">−</button>
                            <input type="number" id="qty-input" value="1" min="1" class="flex-1 px-3 py-2 border-2 border-pink-300 rounded-lg text-center font-semibold" />
                            <button id="qty-plus" class="bg-pink-200 text-pink-600 w-10 h-10 rounded-lg font-bold">+</button>
                        </div>
                    </div>
                    <button id="add-to-cart-btn" class="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-lg font-bold text-lg hover:shadow-lg transition-all">
                        🛒 Tambah ke Keranjang
                    </button>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = favoritesHTML;
    displayFavorites();



    function displayFavorites() {
        const favoritesContent = container.querySelector('#favorites-content');

        if (favorites.items.length === 0) {
            favoritesContent.innerHTML = `
                <div class="text-center py-12">
                    <p class="text-5xl mb-4">💔</p>
                    <p class="text-xl text-gray-600 mb-6">Belum ada produk favorit</p>
                    <p class="text-gray-500 mb-6">Mulai tambahkan produk ke favorit dengan klik ❤️</p>
                    <a href="#produk" class="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all">
                        🍟 Lihat Semua Produk
                    </a>
                </div>
            `;
            return;
        }

        const cardsHTML = favorites.items.map((produk, index) => {
            const imageUrl = produk.produk_image;
            return `
                <div class="card" style="animation-delay: ${index * 0.05}s;" data-produk-id="${produk.produk_id}">
                    <div class="relative mb-4">
                        <img src="${imageUrl}" alt="${produk.produk_name}" class="produk-image rounded-xl shadow-sm object-cover" onerror="this.src='https://via.placeholder.com/400x240?text=No+Image'" />
                        <button class="remove-favorite-btn absolute top-3 right-3 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:scale-110 transition-all" data-produk-id="${produk.produk_id}" title="Hapus dari Favorit">
                            <span class="text-xl">❤️</span>
                        </button>
                    </div>
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center gap-2">
                            <div class="text-3xl">🍕</div>
                            <h2 class="text-lg font-semibold text-gray-800">${produk.produk_name}</h2>
                        </div>
                        <span class="category-badge">${produk.produk_kategori}</span>
                    </div>
                    <div class="flex justify-between items-center mt-3">
                        <div class="flex items-center gap-4">
                            <div class="text-center">
                                <p class="text-xs text-gray-500">💰 Harga</p>
                                <p class="font-bold text-pink-600 text-lg">Rp ${produk.produk_price}</p>
                            </div>
                            <div class="text-center">
                                <p class="text-xs text-gray-500">📦 Stok</p>
                                <p class="font-bold text-pink-600">${produk.produk_stock}</p>
                            </div>
                        </div>
                        <button class="buy-button" data-produk-id="${produk.produk_id}">🛒 Beli</button>
                    </div>
                </div>
            `;
        }).join('');

        favoritesContent.innerHTML = cardsHTML;
        setupBuyButtons();
        setupRemoveButtons();
    }

    let selectedProduct = null;

    function setupBuyButtons() {
        const buyButtons = container.querySelectorAll('.buy-button');
        buyButtons.forEach(button => {
            button.addEventListener('click', () => {
                const produkId = button.dataset.produkId;
                const produk = favorites.items.find(p => p.produk_id === produkId);
                if (produk) {
                    openOrderModal(produk);
                }
            });
        });
    }

    function setupRemoveButtons() {
        const removeButtons = container.querySelectorAll('.remove-favorite-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const produkId = button.dataset.produkId;
                favorites.removeItem(produkId);
                
                // Dispatch update event
                const event = new Event('favoritesUpdated');
                window.dispatchEvent(event);
                
                displayFavorites();
            });
        });
    }

    function openOrderModal(produk) {
        selectedProduct = produk;
        const modal = container.querySelector('#order-modal');
        const imageUrl = produk.produk_image;
        
        const modalContent = container.querySelector('#modal-content');
        modalContent.innerHTML = `
            <img src="${imageUrl}" alt="${produk.produk_name}" class="w-full h-48 object-cover rounded-xl mb-4" />
            <h3 class="text-2xl font-bold text-gray-800 mb-2">${produk.produk_name}</h3>
            <p class="text-gray-600 mb-4">${produk.produk_kategori}</p>
            <p class="text-3xl font-bold text-pink-600 mb-4">Rp ${produk.produk_price}</p>
            <p class="text-sm text-gray-500">Stok tersedia: <span class="font-bold text-gray-800">${produk.produk_stock}</span></p>
        `;

        container.querySelector('#qty-input').value = 1;
        modal.classList.remove('hidden');

        setupModalEvents();
    }

    function setupModalEvents() {
        const modal = container.querySelector('#order-modal');
        const closeBtn = container.querySelector('#close-modal');
        const qtyInput = container.querySelector('#qty-input');
        const qtyMinus = container.querySelector('#qty-minus');
        const qtyPlus = container.querySelector('#qty-plus');
        const addToCartBtn = container.querySelector('#add-to-cart-btn');

        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });

        qtyMinus.addEventListener('click', () => {
            let qty = parseInt(qtyInput.value) || 1;
            if (qty > 1) qtyInput.value = qty - 1;
        });

        qtyPlus.addEventListener('click', () => {
            let qty = parseInt(qtyInput.value) || 1;
            if (qty < parseInt(selectedProduct.produk_stock)) qtyInput.value = qty + 1;
        });

        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(qtyInput.value) || 1;
            if (selectedProduct && quantity > 0) {
                cart.addItem(selectedProduct, quantity);
                
                // Show success message
                const originalText = addToCartBtn.textContent;
                addToCartBtn.textContent = '✅ Ditambahkan!';
                addToCartBtn.style.backgroundColor = '#10b981';
                
                setTimeout(() => {
                    addToCartBtn.textContent = originalText;
                    addToCartBtn.style.backgroundColor = '';
                    modal.classList.add('hidden');
                }, 1500);
            }
        });
    }
}

export { renderFavorites };
