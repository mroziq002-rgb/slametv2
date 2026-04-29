function renderProfile(container) {
    const profileData = fetchProfileData();

    const profileHTML = `
        <div class="flex flex-col items-center p-6 pb-24">
            <img src="img/slamet.jpeg" alt="Profile Photo" class="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-pink-500 bg-gray-300" style="animation: fadeInDown 0.8s ease-out;">
            <h1 class="text-2xl font-bold text-gray-800 mb-2" style="animation: fadeInUp 0.8s ease-out 0.1s backwards;">� Slamet dan Luhur Store 🍔</h1>
            <p class="text-gray-600 mb-6" style="animation: fadeInUp 0.8s ease-out 0.2s backwards;">permataindira1390@gmail.com</p>
            
            <div class="w-full max-w-sm space-y-4" style="animation: fadeInUp 0.8s ease-out 0.3s backwards;">
                <div class="profile-info-box" style="border-left-color: #ec4899;">
                    <p class="text-xs text-gray-500 mb-1">👤 Nama Lengkap</p>
                    <p class="text-lg font-semibold text-gray-800">m fatkhur roziq</p>
                </div>
                <div class="profile-info-box" style="border-left-color: #f472b6;">
                    <p class="text-xs text-gray-500 mb-1">💌 Email</p>
                    <p class="text-lg font-semibold text-gray-800">permataindira1390@gmail.com</p>
                </div>
                <div class="profile-info-box" style="border-left-color: #fbcfe8;">
                    <p class="text-xs text-gray-500 mb-1">📱 Nomor Telepon</p>
                    <p class="text-lg font-semibold text-gray-800"></p>
                </div>
            </div>
            
            <button class="w-full max-w-sm edit-profile" style="animation: fadeInUp 0.8s ease-out 0.4s backwards;">✏️ Edit Profil</button>
        </div>
    `;

    container.innerHTML = profileHTML;
}

function fetchProfileData() {
    return {
        photo: 'https://id.images.search.yahoo.com/images/view;_ylt=AwrPoZurse1p9eYf0bfNQwx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzIwNzM1MzlhMTIxOGI4NzlhYWY4ZjViYjJmY2Q2ZmM4BGdwb3MDOARpdANiaW5n?back=https%3A%2F%2Fid.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dskor%2Breal%2Bmadrid%2Bvs%2Bbarcelona%2B4-0%26ei%3DUTF-8%26type%3DE210ID714G0%26fr%3Dmcafee%26fr2%3Dsa-gp-search%26tab%3Dorganic%26ri%3D8&w=1280&h=720&imgurl=i.ytimg.com%2Fvi%2FxwuhO5oHAjE%2Fmaxresdefault.jpg&rurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DxwuhO5oHAjE&size=133KB&p=skor+real+madrid+vs+barcelona+4-0&oid=2073539a1218b879aaf8f5bb2fcd6fc8&fr2=sa-gp-search&fr=mcafee&tt=Barcelona+vs+Real+Madrid+%5B0-4%5D%2C+Copa+del+Rey%2C+Semi-Final+2nd+leg+...&b=0&ni=120&no=8&ts=&tab=organic&sigr=Batvhe0QKMld&sigb=mOKdbb9W6SxX&sigi=nwE495enrVyV&sigt=S_wu2yZb8EmY&.crumb=pERTQl9DFLi&fr=mcafee&fr2=sa-gp-search&type=E210ID714G0',
        name: 'ozy'
    };
}

export { renderProfile };