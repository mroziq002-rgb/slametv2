function renderProduk(container) {
    // Import favorites
    import('../utils/favorites.js').then(({ favorites }) => {
        const produkHTML = `
            <div class="p-4 pb-24">
                <h1 class="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent" style="animation: fadeInDown 0.8s ease-out;">🍟 Daftar Produk 🍟</h1>
                
                <!-- Search Bar -->
                <div class="mb-6" style="animation: fadeInUp 0.8s ease-out 0.1s backwards;">
                    <input 
                        type="text" 
                        id="search-input" 
                        placeholder="🔍 Cari makanan atau minuman..." 
                        class="w-full px-4 py-3 rounded-lg border-2 border-pink-300 focus:outline-none focus:border-pink-500 text-gray-800"
                        style="box-shadow: 0 2px 8px rgba(236, 72, 153, 0.1);"
                    />
                </div>

                <!-- Category Filter -->
                <div class="flex gap-2 mb-6 flex-wrap" style="animation: fadeInUp 0.8s ease-out 0.2s backwards;">
                    <button class="category-filter-btn active" data-category="SEMUA">
                        ✨ Semua
                    </button>
                    <button class="category-filter-btn" data-category="MAKANAN">
                        🍔 Makanan
                    </button>
                    <button class="category-filter-btn" data-category="MINUMAN">
                        🥤 Minuman
                    </button>
                </div>

                <!-- Produk List -->
                <div class="space-y-4" id="produk-list"></div>
                
                <!-- No Results Message -->
                <div id="no-results" class="hidden p-6 text-center">
                    <p class="text-2xl mb-2">😞</p>
                    <p class="text-gray-500">Produk tidak ditemukan</p>
                </div>
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
        
        container.innerHTML = produkHTML;
    
    function normalizeImageUrl(rawUrl) {
        if (!rawUrl) {
            return 'https://via.placeholder.com/400x240?text=No+Image';
        }
        let url = String(rawUrl).trim();
        
        // Remove any leading non-URL characters and newlines
        url = url.replace(/^[\s\W]*(https?:\/\/)/, '$1');
        
        // Remove duplicate https:// protocols
        url = url.replace(/https:\/\/https:\/\//g, 'https://');
        url = url.replace(/^[m:]*https:\/\//g, 'https://');
        
        // Handle lh3.googleusercontent.com (Google Drive images)
        if (url.includes('lh3.googleusercontent.com')) {
            if (!url.startsWith('https://')) {
                url = 'https://' + url.replace(/^https?:\/\//, '');
            }
            return url;
        }
        
        // Handle Google Drive URLs
        const driveFileMatch = url.match(/https:\/\/drive\.google\.com\/file\/d\/([^/]+)\/view/);
        const driveOpenMatch = url.match(/https:\/\/drive\.google\.com\/open\?id=([^&]+)/);
        const driveUcMatch = url.match(/https:\/\/drive\.google\.com\/uc\?id=([^&]+)/);

        if (driveFileMatch) {
            url = `https://drive.google.com/uc?export=view&id=${driveFileMatch[1]}`;
        } else if (driveOpenMatch) {
            url = `https://drive.google.com/uc?export=view&id=${driveOpenMatch[1]}`;
        } else if (driveUcMatch) {
            url = `https://drive.google.com/uc?export=view&id=${driveUcMatch[1]}`;
        }

        return url || 'https://via.placeholder.com/400x240?text=No+Image';
    }

    const dataUrl = new URL('../../data/TABEL_PRODUK_rows.json', import.meta.url);
    let allProducts = [];
    let currentFilter = 'SEMUA';
    let selectedProduct = null;

    fetch(dataUrl)
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            displayProducts(allProducts);
            setupSearchAndFilter();
        })
        .catch(error => {
            console.error('Error loading produk data:', error);
            container.innerHTML = '<p class="p-4 text-red-500">⚠️ Error loading produk data.</p>';
        });

    function displayProducts(products) {
        const produkList = container.querySelector('#produk-list');
        const noResults = container.querySelector('#no-results');

        if (products.length === 0) {
            produkList.innerHTML = '';
            noResults.classList.remove('hidden');
            return;
        }

        noResults.classList.add('hidden');
        const cardsHTML = products.map((produk, index) => {
            const imageUrl = normalizeImageUrl(produk.produk_image);
            const isFavorited = favorites.isFavorite(produk.produk_id);
            return `
                <div class="card" style="animation-delay: ${index * 0.05}s;" data-produk-id="${produk.produk_id}">
                    <div class="relative mb-4">
                        <img src="${imageUrl}" alt="${produk.produk_name}" class="produk-image rounded-xl shadow-sm mb-4 object-cover" onerror="this.src='https://via.placeholder.com/400x240?text=No+Image'" />
                        <button class="favorite-btn absolute top-3 right-3 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:scale-110 transition-all" data-produk-id="${produk.produk_id}" title="Tambah ke Favorit">
                            <span class="text-xl">${isFavorited ? '❤️' : '🤍'}</span>
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
        produkList.innerHTML = cardsHTML;
        setupBuyButtons();
        setupFavoriteButtons();
    }

    function setupBuyButtons() {
        const buyButtons = container.querySelectorAll('.buy-button');
        buyButtons.forEach(button => {
            button.addEventListener('click', () => {
                const produkId = button.dataset.produkId;
                const produk = allProducts.find(p => p.produk_id === produkId);
                if (produk) {
                    openOrderModal(produk);
                }
            });
        });
    }

    function openOrderModal(produk) {
        selectedProduct = produk;
        const modal = container.querySelector('#order-modal');
        const imageUrl = normalizeImageUrl(produk.produk_image);
        
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
                import('../utils/cart.js').then(({ cart }) => {
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
                });
            }
        });
    }

    function setupFavoriteButtons() {
        const favoriteButtons = container.querySelectorAll('.favorite-btn');
        favoriteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const produkId = button.dataset.produkId;
                const produk = allProducts.find(p => p.produk_id === produkId);
                
                if (produk) {
                    const isFavorited = favorites.toggleFavorite(produk);
                    
                    // Update button icon
                    button.innerHTML = `<span class="text-xl">${isFavorited ? '❤️' : '🤍'}</span>`;
                    
                    // Add animation
                    button.style.transform = 'scale(1.3)';
                    setTimeout(() => {
                        button.style.transform = 'scale(1)';
                    }, 200);
                    
                    // Update favorite badge in navbar
                    updateFavoriteBadge();
                }
            });
        });
    }

    function filterProducts() {
        const searchInput = container.querySelector('#search-input').value.toLowerCase();
        
        let filtered = allProducts.filter(produk => {
            const matchesSearch = produk.produk_name.toLowerCase().includes(searchInput);
            const matchesCategory = currentFilter === 'SEMUA' || produk.produk_kategori === currentFilter;
            return matchesSearch && matchesCategory;
        });

        displayProducts(filtered);
    }

    function setupSearchAndFilter() {
        // Search input event listener
        const searchInput = container.querySelector('#search-input');
        searchInput.addEventListener('input', filterProducts);

        // Category filter buttons
        const filterButtons = container.querySelectorAll('.category-filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                currentFilter = button.dataset.category;
                filterProducts();
            });
        });
    }

    function updateFavoriteBadge() {
        // This function will be called from main.js to update favorite badge
        const event = new Event('favoritesUpdated');
        window.dispatchEvent(event);
    }
    });
}

export { renderProduk };