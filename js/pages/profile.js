function renderProfile(container) {
    const profileData = fetchProfileData();

    const profileHTML = `
        <div class="flex flex-col items-center p-4">
            <img src="${profileData.photo}" alt="Profile Photo" class="w-32 h-32 rounded-full mb-4">
            <h1 class="text-2xl font-bold mb-2">${profileData.name}</h1>
            <button class="bg-blue-500 text-white px-4 py-2 rounded">Edit Profile</button>
        </div>
    `;

    container.innerHTML = profileHTML;
}

function fetchProfileData() {
    return {
        photo: 'path/to/profile/photo.jpg', // This should be replaced with actual data from profile.json
        name: 'John Doe' // This should be replaced with actual data from profile.json
    };
}

export { renderProfile };