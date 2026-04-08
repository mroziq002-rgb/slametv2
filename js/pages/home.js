function renderHome(container) {
    const mainContent = `
        <div class="home-content">
            <h1>Welcome to the Home Page</h1>
            <p>Explore our features and enjoy your stay!</p>
        </div>
    `;

    container.innerHTML = mainContent;
}

export { renderHome };