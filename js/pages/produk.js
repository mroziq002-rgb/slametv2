function renderProduk(container) {
    const produkHTML = `
        <div class="p-4">
            <h1 class="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent" style="animation: fadeInDown 0.8s ease-out;">🍟 Daftar Produk 🍟</h1>
            <div class="space-y-4" id="produk-list"></div>
        </div>
    `;
    
    container.innerHTML = produkHTML;
    
    fetch('data/TABEL_PRODUK_rows.json')
        .then(response => response.json())
        .then(data => {
            const produkList = container.querySelector('#produk-list');
            const cardsHTML = data.map((produk, index) => `
                <div class="card" style="animation-delay: ${index * 0.05}s;">
                    <img src="${produk.produk_image}" alt="${produk.produk_name}" class="produk-image rounded-xl shadow-sm mb-4 object-cover" onerror="this.src='https://via.placeholder.com/400x240?text=No+Image'" />
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
            `).join('');
            produkList.innerHTML = cardsHTML;
        })
        .catch(error => {
            console.error('Error loading produk data:', error);
            container.innerHTML = '<p class="p-4 text-red-500">⚠️ Error loading produk data.</p>';
        });
}

export { renderProduk };