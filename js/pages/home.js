function renderHome(container) {
    const mainContent = `
        <div class="flex flex-col items-center justify-center min-h-screen gap-8 pb-24">
            <div class="text-center animate-fadeInDown" style="animation: fadeInDown 0.8s ease-out;">
                <div class="flex items-center justify-center gap-4 mb-6">
                    <img src="https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" alt="Real Madrid Logo" class="h-12 w-12">
                    <h1 class="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Kantin Bu Rasyid</h1>
                </div>
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