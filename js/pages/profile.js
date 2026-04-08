function renderProfile(container) {
    const profileData = fetchProfileData();

    const profileHTML = `
        <div class="flex flex-col items-center p-6 pb-24">
            <img src="${profileData.photo}" alt="Profile Photo" class="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-pink-500 bg-gray-300" style="animation: fadeInDown 0.8s ease-out;">
            <h1 class="text-2xl font-bold text-gray-800 mb-2" style="animation: fadeInUp 0.8s ease-out 0.1s backwards;">🌸 John Doe 🌸</h1>
            <p class="text-gray-600 mb-6" style="animation: fadeInUp 0.8s ease-out 0.2s backwards;">john@example.com</p>
            
            <div class="w-full max-w-sm space-y-4" style="animation: fadeInUp 0.8s ease-out 0.3s backwards;">
                <div class="profile-info-box" style="border-left-color: #ec4899;">
                    <p class="text-xs text-gray-500 mb-1">👤 Nama Lengkap</p>
                    <p class="text-lg font-semibold text-gray-800">John Doe</p>
                </div>
                <div class="profile-info-box" style="border-left-color: #f472b6;">
                    <p class="text-xs text-gray-500 mb-1">💌 Email</p>
                    <p class="text-lg font-semibold text-gray-800">john@example.com</p>
                </div>
                <div class="profile-info-box" style="border-left-color: #fbcfe8;">
                    <p class="text-xs text-gray-500 mb-1">📱 Nomor Telepon</p>
                    <p class="text-lg font-semibold text-gray-800">+62 812 3456 7890</p>
                </div>
            </div>
            
            <button class="w-full max-w-sm edit-profile" style="animation: fadeInUp 0.8s ease-out 0.4s backwards;">✏️ Edit Profil</button>
        </div>
    `;

    container.innerHTML = profileHTML;
}

function fetchProfileData() {
    return {
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        name: 'John Doe'
    };
}

export { renderProfile };