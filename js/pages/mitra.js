function renderMitra(container) {
    fetch('data/TABEL_MITRA_rows.json')
        .then(response => response.json())
        .then(data => {
            const mitraHTML = `
                <div class="p-4">
                    <h1 class="text-2xl font-bold mb-4">Daftar Mitra</h1>
                    <div class="space-y-4">
                        ${data.map(mitra => `
                            <div class="bg-white p-4 rounded shadow">
                                <h2 class="text-lg font-semibold">${mitra.mitra_name}</h2>
                                <p class="text-gray-600">${mitra.address_owner}</p>
                                <p class="text-sm text-gray-500">Email: ${mitra.email_owner}</p>
                                <p class="text-sm text-gray-500">Kategori: ${mitra.kategori}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            container.innerHTML = mitraHTML;
        })
        .catch(error => {
            console.error('Error loading mitra data:', error);
            container.innerHTML = '<p class="p-4">Error loading mitra data.</p>';
        });
}

export { renderMitra };