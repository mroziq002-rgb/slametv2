function createHeader() {
    const header = document.createElement('header');
    header.className = 'bg-blue-500 p-4 text-white';

    const title = document.createElement('h1');
    title.className = 'text-xl font-bold';
    title.textContent = 'My Web Project';

    header.appendChild(title);
    return header;
}

export default createHeader;