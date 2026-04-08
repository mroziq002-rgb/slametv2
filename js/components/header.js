function createHeader() {
    const header = document.createElement('header');
    header.className = 'bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg p-4 text-white';

    const title = document.createElement('h1');
    title.className = 'text-2xl font-bold';
    title.textContent = '🛍️ Kantin Bu Ning';

    header.appendChild(title);
    return header;
}

export default createHeader;