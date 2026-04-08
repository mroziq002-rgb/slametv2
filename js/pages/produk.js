function renderProduk(container) {
    fetch('data/TABEL_PRODUK_rows.json')
        .then(response => response.json())
        .then(data => {
            const produkHTML = `
                <div class="p-4">
                    <h1 class="text-2xl font-bold mb-4">Daftar Produk</h1>
                    <div class="space-y-4">
                        ${data.map(produk => `
                            <div class="bg-white p-4 rounded shadow">
                                <h2 class="text-lg font-semibold">${produk.produk_name}</h2>
                                <p class="text-gray-600">Kategori: ${produk.produk_kategori}</p>
                                <p class="text-sm text-gray-500">Harga: Rp ${produk.produk_price}</p>
                                <p class="text-sm text-gray-500">Stok: ${produk.produk_stock}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            container.innerHTML = produkHTML;
        })
        .catch(error => {
            console.error('Error loading produk data:', error);
            container.innerHTML = '<p class="p-4">Error loading produk data.</p>';
        });
}

export { renderProduk };