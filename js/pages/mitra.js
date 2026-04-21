function renderMitra(container) {
    const mitraHTML = `
        <div class="p-4">
            <h1 class="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent" style="animation: fadeInDown 0.8s ease-out;">🍔 Daftar Mitra 🍔</h1>
            <div class="space-y-4" id="mitra-list"></div>
        </div>
    `;
    
    container.innerHTML = mitraHTML;
    
    const dataUrl = new URL('../../data/TABEL_MITRA_rows.json', import.meta.url);
    fetch(dataUrl)
        .then(response => response.json())
        .then(data => {
            const mitraList = container.querySelector('#mitra-list');
            const cardsHTML = data.map((mitra, index) => `
                <div class="card" style="animation-delay: ${index * 0.1}s;">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="text-3xl">🍜</div>
                        <h2 class="text-lg font-semibold text-gray-800">${mitra.mitra_name}</h2>
                    </div>
                    <p class="text-gray-600 mb-2 text-sm">📍 ${mitra.address_owner}</p>
                    <p class="text-sm text-pink-600 font-medium">💌 ${mitra.email_owner}</p>
                    <p class="text-xs text-gray-500 mt-2">🏷️ ${mitra.kategori}</p>
                </div>
            `).join('');
            mitraList.innerHTML = cardsHTML;
        })
        .catch(error => {
            console.error('Error loading mitra data:', error);
            container.innerHTML = '<p class="p-4 text-red-500">⚠️ Error loading mitra data.</p>';
        });
}

export { renderMitra };