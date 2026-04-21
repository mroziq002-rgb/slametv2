function renderHome(container) {
    const mainContent = `
        <div class="flex flex-col items-center justify-center min-h-screen gap-8 pb-24">
            <div class="text-center animate-fadeInDown" style="animation: fadeInDown 0.8s ease-out;">
                <h1 class="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">🍕 Kantin Bu Ning 🍕</h1>
                <p class="text-lg text-gray-600 mb-8">Jelajahi mitra dan produk terbaik kami</p>
                <div class="flex gap-4 justify-center flex-wrap">
                    <div class="feature-box cursor-pointer" data-navigate="mitra" style="animation: fadeInUp 0.8s ease-out 0.1s backwards;">
                        <div class="text-4xl mb-2">🍔</div>
                        <h3>Mitra</h3>
                        <p>Lihat semua mitra</p>
                    </div>
                    <div class="feature-box cursor-pointer" data-navigate="produk" style="animation: fadeInUp 0.8s ease-out 0.2s backwards;">
                        <div class="text-4xl mb-2">🍟</div>
                        <h3>Produk</h3>
                        <p>Belanja sekarang</p>
                    </div>
                    <div class="feature-box cursor-pointer" data-navigate="akun" style="animation: fadeInUp 0.8s ease-out 0.3s backwards;">
                        <div class="text-4xl mb-2">👤</div>
                        <h3>Akun</h3>
                        <p>Profil Anda</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = mainContent;

    // Add click handlers
    container.querySelectorAll('.feature-box').forEach(box => {
        box.addEventListener('click', () => {
            const route = box.dataset.navigate;
            window.location.hash = '#' + route;
        });
    });
}

export { renderHome };