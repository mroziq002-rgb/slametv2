// Cart Management System
class Cart {
    constructor() {
        this.loadCart();
    }

    loadCart() {
        const saved = localStorage.getItem('kantinCart');
        this.items = saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('kantinCart', JSON.stringify(this.items));
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.produk_id === product.produk_id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                ...product,
                quantity: quantity
            });
        }
        this.saveCart();
    }

    removeItem(produk_id) {
        this.items = this.items.filter(item => item.produk_id !== produk_id);
        this.saveCart();
    }

    updateQuantity(produk_id, quantity) {
        const item = this.items.find(item => item.produk_id === produk_id);
        if (item) {
            item.quantity = Math.max(0, quantity);
            if (item.quantity === 0) {
                this.removeItem(produk_id);
            } else {
                this.saveCart();
            }
        }
    }

    getTotal() {
        return this.items.reduce((sum, item) => {
            const price = parseInt(String(item.produk_price).replace(/[^\d]/g, '')) || 0;
            return sum + (price * item.quantity);
        }, 0);
    }

    getItemCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    clear() {
        this.items = [];
        this.saveCart();
    }
}

export const cart = new Cart();
