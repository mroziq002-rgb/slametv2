function renderProfile(container) {
    const profileData = fetchProfileData();

    const profileHTML = `
        <div class="profile-content">
            <img src="${profileData.photo}" alt="Profile Photo" class="profile-photo">
            <h1 class="profile-name">${profileData.name}</h1>
            <button class="edit-profile">Edit Profile</button>
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