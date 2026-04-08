function createBottomNav() {
    const nav = document.createElement('nav');
    nav.className = 'fixed bottom-0 left-0 right-0 bg-white shadow-md';

    const navList = document.createElement('ul');
    navList.className = 'flex justify-around p-2';

    const navItems = [
        { icon: '🏠', label: 'Home', id: 'home' },
        { icon: '🤝', label: 'Mitra', id: 'mitra' },
        { icon: '📦', label: 'Produk', id: 'produk' },
        { icon: '👤', label: 'Akun', id: 'akun' },
    ];

    navItems.forEach(item => {
        const navItem = document.createElement('li');
        navItem.className = 'cursor-pointer text-center';
        navItem.id = item.id;

        const icon = document.createElement('span');
        icon.textContent = item.icon;
        const label = document.createElement('span');
        label.textContent = item.label;

        navItem.appendChild(icon);
        navItem.appendChild(label);
        navList.appendChild(navItem);
    });

    nav.appendChild(navList);
    return nav;
}

export default createBottomNav;