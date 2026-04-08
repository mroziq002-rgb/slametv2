function createBottomNav() {
    const nav = document.createElement('nav');
    nav.className = 'fixed bottom-0 left-0 right-0 bg-gradient-to-t from-pink-50 to-white shadow-2xl flex justify-around p-3 border-t-4 border-pink-300';

    const navList = document.createElement('ul');
    navList.className = 'flex justify-around w-full gap-2';

    const navItems = [
        { icon: '🏠', label: 'Home', id: 'home' },
        { icon: '🍔', label: 'Mitra', id: 'mitra' },
        { icon: '🍟', label: 'Produk', id: 'produk' },
        { icon: '🌮', label: 'Akun', id: 'akun' },
    ];

    navItems.forEach((item, index) => {
        const navItem = document.createElement('li');
        navItem.className = 'cursor-pointer text-center text-rose-600 hover:text-pink-600 transition-all duration-300 p-2 rounded-lg hover:bg-pink-100 flex-1';
        navItem.id = item.id;
        navItem.style.animation = `fadeInUp 0.8s ease-out ${0.1 * index}s backwards`;

        const icon = document.createElement('span');
        icon.className = 'text-2xl block';
        icon.textContent = item.icon;
        
        const label = document.createElement('span');
        label.className = 'text-xs block mt-1 font-medium';
        label.textContent = item.label;

        navItem.appendChild(icon);
        navItem.appendChild(label);
        
        navItem.addEventListener('mouseenter', () => {
            navItem.style.transform = 'scale(1.1)';
        });
        navItem.addEventListener('mouseleave', () => {
            navItem.style.transform = 'scale(1)';
        });
        
        navList.appendChild(navItem);
    });

    nav.appendChild(navList);
    return nav;
}

export default createBottomNav;