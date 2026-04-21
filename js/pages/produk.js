function renderProduk(container) {
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
            return `
                <div class="card" style="animation-delay: ${index * 0.05}s;">
                    <img src="${imageUrl}" alt="${produk.produk_name}" class="produk-image rounded-xl shadow-sm mb-4 object-cover" onerror="this.src='https://via.placeholder.com/400x240?text=No+Image'" />
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
                        <button class="buy-button">🛒 Beli</button>
                    </div>
                </div>
            `;
        }).join('');
        produkList.innerHTML = cardsHTML;
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
}

export { renderProduk };