function renderHome(container) {
    const mainContent = `
        <div class="flex flex-col items-center justify-center min-h-screen gap-8 pb-24">
            <div class="text-center animate-fadeInDown" style="animation: fadeInDown 0.8s ease-out;">
                <h1 class="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Selamat Datang</h1>
                <p class="text-lg text-gray-600 mb-8">Jelajahi mitra dan produk terbaik kami</p>
                <div class="flex gap-4 justify-center flex-wrap">
                    <div class="bg-white rounded-xl shadow-lg p-6 w-40 transform hover:scale-105 transition-all duration-300" style="animation: fadeInUp 0.8s ease-out 0.1s backwards;">
                        <div class="text-4xl mb-2">🤝</div>
                        <h3 class="font-semibold text-gray-800">Mitra</h3>
                        <p class="text-sm text-gray-600">Lihat semua mitra</p>
                    </div>
                    <div class="bg-white rounded-xl shadow-lg p-6 w-40 transform hover:scale-105 transition-all duration-300" style="animation: fadeInUp 0.8s ease-out 0.2s backwards;">
                        <div class="text-4xl mb-2">📦</div>
                        <h3 class="font-semibold text-gray-800">Produk</h3>
                        <p class="text-sm text-gray-600">Belanja sekarang</p>
                    </div>
                    <div class="bg-white rounded-xl shadow-lg p-6 w-40 transform hover:scale-105 transition-all duration-300" style="animation: fadeInUp 0.8s ease-out 0.3s backwards;">
                        <div class="text-4xl mb-2">👤</div>
                        <h3 class="font-semibold text-gray-800">Akun</h3>
                        <p class="text-sm text-gray-600">Profil Anda</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = mainContent;
}

export { renderHome };