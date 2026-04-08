function renderHome(container) {
    const mainContent = `
        <div class="flex flex-col items-center justify-center h-screen">
            <h1 class="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
            <p class="text-lg">Explore our features and enjoy your stay!</p>
        </div>
    `;

    container.innerHTML = mainContent;
}

export { renderHome };