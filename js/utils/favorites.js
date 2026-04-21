// Favorites Management System
class Favorites {
    constructor() {
        this.loadFavorites();
    }

    loadFavorites() {
        const saved = localStorage.getItem('kantinFavorites');
        this.items = saved ? JSON.parse(saved) : [];
    }

    saveFavorites() {
        localStorage.setItem('kantinFavorites', JSON.stringify(this.items));
    }

    addItem(product) {
        const exists = this.items.find(item => item.produk_id === product.produk_id);
        if (!exists) {
            this.items.push(product);
            this.saveFavorites();
            return true;
        }
        return false;
    }

    removeItem(produk_id) {
        this.items = this.items.filter(item => item.produk_id !== produk_id);
        this.saveFavorites();
    }

    isFavorite(produk_id) {
        return this.items.some(item => item.produk_id === produk_id);
    }

    toggleFavorite(product) {
        if (this.isFavorite(product.produk_id)) {
            this.removeItem(product.produk_id);
            return false;
        } else {
            this.addItem(product);
            return true;
        }
    }

    getCount() {
        return this.items.length;
    }

    clear() {
        this.items = [];
        this.saveFavorites();
    }
}

export const favorites = new Favorites();
