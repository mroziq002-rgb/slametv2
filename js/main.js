// This file contains the main JavaScript logic for the application. It initializes the app, handles routing between the Home and Profile pages, and manages interactions.

import { renderHome } from './pages/home.js';
import { renderProfile } from './pages/profile.js';
import createHeader from './components/header.js';
import createBottomNav from './components/bottom-nav.js';

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

    window.addEventListener('hashchange', handleRouting);
    handleRouting();
}

function handleRouting() {
    const hash = window.location.hash;

    if (hash === '#profile') {
        renderProfile(mainContentDiv);
    } else {
        renderHome(mainContentDiv);
    }
}

init();