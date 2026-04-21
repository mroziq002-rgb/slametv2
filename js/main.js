// This file contains the main JavaScript logic for the application. It initializes the app, handles routing between the Home and Profile pages, and manages interactions.

import { renderHome } from './pages/home.js';
import { renderProfile } from './pages/profile.js';
import { renderMitra } from './pages/mitra.js';
import { renderProduk } from './pages/produk.js';
import { renderCart } from './pages/cart.js';
import { renderOrder } from './pages/order.js';
import createHeader from './components/header.js';
import createBottomNav from './components/bottom-nav.js';
import { cart } from './utils/cart.js';

const app = document.getElementById('app');
const headerDiv = document.getElementById('header');
const mainContentDiv = document.getElementById('main-content');
const bottomNavDiv = document.getElementById('bottom-nav');

function init() {
    // Inject header and bottom nav
    headerDiv.appendChild(createHeader());
    bottomNavDiv.appendChild(createBottomNav());

    // Add event listeners for bottom nav
    const navItems = bottomNavDiv.querySelectorAll('li');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            window.location.hash = '#' + item.id;
        });
    });

    // Update cart badge
    updateCartBadge();
    window.addEventListener('storage', updateCartBadge);

    window.addEventListener('hashchange', handleRouting);
    handleRouting();
}

function updateCartBadge() {
    const cartBadge = bottomNavDiv.querySelector('.cart-badge');
    const itemCount = cart.getItemCount();
    if (cartBadge) {
        if (itemCount > 0) {
            cartBadge.textContent = itemCount;
            cartBadge.classList.remove('hidden');
        } else {
            cartBadge.classList.add('hidden');
        }
    }
}

function handleRouting() {
    const hash = window.location.hash;

    if (hash === '#akun') {
        renderProfile(mainContentDiv);
    } else if (hash === '#mitra') {
        renderMitra(mainContentDiv);
    } else if (hash === '#produk') {
        renderProduk(mainContentDiv);
    } else if (hash === '#keranjang') {
        renderCart(mainContentDiv);
    } else if (hash === '#pesanan') {
        renderOrder(mainContentDiv);
    } else {
        renderHome(mainContentDiv);
    }
}

init();