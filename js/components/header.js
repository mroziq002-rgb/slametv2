function createHeader() {
    const header = document.createElement('header');
    header.className = 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg p-4 text-white';

    const titleContainer = document.createElement('div');
    titleContainer.className = 'flex items-center gap-3';

    const logo = document.createElement('img');
    logo.src = 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg';
    logo.alt = 'Manchester United Logo';
    logo.className = 'h-8 w-8';

    const title = document.createElement('h1');
    title.className = 'text-2xl font-bold';
    title.textContent = 'Kantin Bu Rasyid';

    titleContainer.appendChild(logo);
    titleContainer.appendChild(title);

    header.appendChild(titleContainer);
    return header;
}

export default createHeader;