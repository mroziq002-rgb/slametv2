import { cart } from '../utils/cart.js';

function renderOrder(container) {
    const orderHTML = `
        <div class="p-4 pb-24">
            <h1 class="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent" style="animation: fadeInDown 0.8s ease-out;">📦 Pesanan</h1>
            <div id="order-content"></div>
        </div>
    `;
    
    container.innerHTML = orderHTML;
    displayOrder();

    function displayOrder() {
        const orderContent = container.querySelector('#order-content');

        // Check if user has existing orders
        const orders = JSON.parse(localStorage.getItem('kantinOrders') || '[]');
        const cartItems = cart.items;

        if (cartItems.length === 0 && orders.length === 0) {
            orderContent.innerHTML = `
                <div class="text-center py-12">
                    <p class="text-5xl mb-4">📭</p>
                    <p class="text-xl text-gray-600 mb-6">Belum ada pesanan</p>
                    <p class="text-gray-500">Mulai belanja sekarang!</p>
                </div>
            `;
            return;
        }

        let content = '';

        // Show checkout form if cart has items
        if (cartItems.length > 0) {
            const total = cart.getTotal();
            content += `
                <div class="mb-6">
                    <h2 class="text-2xl font-bold mb-4 text-gray-800">📋 Form Pemesanan</h2>
                    
                    <div class="card mb-4">
                        <h3 class="text-lg font-bold mb-3 text-gray-800">Alamat Pengiriman</h3>
                        <input type="text" id="customer-name" placeholder="Nama Lengkap" class="w-full px-4 py-2 border-2 border-pink-300 rounded-lg mb-3" />
                        <input type="tel" id="customer-phone" placeholder="No. Telepon" class="w-full px-4 py-2 border-2 border-pink-300 rounded-lg mb-3" />
                        <textarea id="customer-address" placeholder="Alamat Lengkap" class="w-full px-4 py-2 border-2 border-pink-300 rounded-lg mb-3" rows="3"></textarea>
                    </div>

                    <div class="card mb-4">
                        <h3 class="text-lg font-bold mb-3 text-gray-800">📦 Pesanan</h3>
                        <div class="space-y-2 mb-4">
                            ${cartItems.map(item => {
                                const price = parseInt(String(item.produk_price).replace(/[^\d]/g, '')) || 0;
                                return `
                                    <div class="flex justify-between text-sm pb-2 border-b">
                                        <span>${item.produk_name} x${item.quantity}</span>
                                        <span class="font-semibold">Rp ${(price * item.quantity).toLocaleString('id-ID')}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                        <div class="border-t-2 pt-3 mb-4">
                            <div class="flex justify-between mb-2 text-gray-700">
                                <span>Subtotal:</span>
                                <span class="font-semibold">Rp ${total.toLocaleString('id-ID')}</span>
                            </div>
                            <div class="flex justify-between mb-3 text-gray-700">
                                <span>Ongkos Kirim:</span>
                                <span class="font-semibold">Rp 10.000</span>
                            </div>
                            <div class="flex justify-between text-lg font-bold text-pink-600">
                                <span>Total:</span>
                                <span>Rp ${(total + 10000).toLocaleString('id-ID')}</span>
                            </div>
                        </div>

                        <h3 class="text-lg font-bold mb-3 text-gray-800 mt-6">💳 Metode Pembayaran</h3>
                        <div class="space-y-2">
                            <label class="flex items-center p-3 border-2 border-pink-300 rounded-lg cursor-pointer hover:bg-pink-50">
                                <input type="radio" name="payment" value="cash" checked />
                                <span class="ml-3">💵 Bayar di Tempat</span>
                            </label>
                            <label class="flex items-center p-3 border-2 border-pink-300 rounded-lg cursor-pointer hover:bg-pink-50">
                                <input type="radio" name="payment" value="transfer" />
                                <span class="ml-3">🏦 Transfer Bank</span>
                            </label>
                        </div>
                    </div>

                    <button id="confirm-order-btn" class="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-lg font-bold text-lg hover:shadow-lg transition-all">
                        ✅ Konfirmasi Pesanan
                    </button>
                </div>
            `;
        }

        // Show order history
        if (orders.length > 0) {
            content += `
                <div>
                    <h2 class="text-2xl font-bold mb-4 text-gray-800">📜 Riwayat Pesanan</h2>
                    <div class="space-y-4">
                        ${orders.map((order, idx) => `
                            <div class="card cursor-pointer hover:shadow-lg transition-all" onclick="document.getElementById('order-detail-${idx}').classList.toggle('hidden')">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <p class="font-bold text-gray-800">Pesanan #${order.orderId}</p>
                                        <p class="text-sm text-gray-500">${order.date}</p>
                                        <p class="text-sm text-gray-600 mt-1">🚚 Status: <span class="font-semibold ${order.status === 'delivered' ? 'text-green-600' : order.status === 'on-delivery' ? 'text-blue-600' : 'text-yellow-600'}">${order.status === 'delivered' ? '✅ Diterima' : order.status === 'on-delivery' ? '🚗 Dalam Perjalanan' : '⏳ Diproses'}</span></p>
                                    </div>
                                    <p class="text-lg font-bold text-pink-600">Rp ${order.total.toLocaleString('id-ID')}</p>
                                </div>
                                <div id="order-detail-${idx}" class="hidden mt-3 pt-3 border-t-2 border-pink-300">
                                    ${order.items.map(item => `
                                        <p class="text-sm text-gray-700">• ${item.produk_name} x${item.quantity}</p>
                                    `).join('')}
                                    <p class="text-sm text-gray-600 mt-3">👤 ${order.customerName}</p>
                                    <p class="text-sm text-gray-600">📍 ${order.address}</p>
                                    ${order.driver ? `
                                        <div class="mt-3 p-3 bg-pink-50 rounded">
                                            <p class="text-sm font-semibold text-gray-800">🚗 Driver</p>
                                            <p class="text-sm text-gray-700">${order.driver.name}</p>
                                            <p class="text-sm text-gray-700">📱 ${order.driver.phone}</p>
                                            <p class="text-sm text-gray-700">🗺️ ${order.driver.location}</p>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        orderContent.innerHTML = content;

        // Setup event listeners
        const confirmBtn = container.querySelector('#confirm-order-btn');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', placeOrder);
        }
    }

    function placeOrder() {
        const name = container.querySelector('#customer-name').value;
        const phone = container.querySelector('#customer-phone').value;
        const address = container.querySelector('#customer-address').value;
        const payment = container.querySelector('input[name="payment"]:checked').value;

        if (!name || !phone || !address) {
            alert('Mohon isi semua data pengiriman');
            return;
        }

        // Create order object
        const order = {
            orderId: 'ORD-' + Date.now(),
            date: new Date().toLocaleDateString('id-ID'),
            items: cart.items,
            total: cart.getTotal() + 10000,
            customerName: name,
            customerPhone: phone,
            address: address,
            payment: payment,
            status: 'pending',
            driver: generateRandomDriver()
        };

        // Save order
        const orders = JSON.parse(localStorage.getItem('kantinOrders') || '[]');
        orders.unshift(order);
        localStorage.setItem('kantinOrders', JSON.stringify(orders));

        // Simulate driver assignment after 2 seconds
        setTimeout(() => {
            orders[0].status = 'processing';
            localStorage.setItem('kantinOrders', JSON.stringify(orders));
        }, 2000);

        // Simulate driver pickup after 5 seconds
        setTimeout(() => {
            orders[0].status = 'on-delivery';
            orders[0].driver.location = 'Sedang menuju lokasi Anda';
            localStorage.setItem('kantinOrders', JSON.stringify(orders));
        }, 5000);

        // Simulate delivery after 10 seconds
        setTimeout(() => {
            orders[0].status = 'delivered';
            orders[0].driver.location = 'Telah sampai di lokasi';
            localStorage.setItem('kantinOrders', JSON.stringify(orders));
        }, 10000);

        // Clear cart
        cart.clear();

        // Show success message
        const confirmBtn = container.querySelector('#confirm-order-btn');
        const originalText = confirmBtn.textContent;
        confirmBtn.textContent = '✅ Pesanan Berhasil!';
        confirmBtn.style.backgroundColor = '#10b981';
        confirmBtn.disabled = true;

        setTimeout(() => {
            // Refresh display
            displayOrder();
        }, 1500);
    }

    function generateRandomDriver() {
        const drivers = [
            { name: 'Budi Santoso', phone: '081234567890' },
            { name: 'Ahmad Wijaya', phone: '081298765432' },
            { name: 'Siti Nurhayati', phone: '081345678901' },
            { name: 'Eko Prasetyo', phone: '081456789012' }
        ];
        const driver = drivers[Math.floor(Math.random() * drivers.length)];
        return {
            ...driver,
            location: 'Driver sedang dikonfirmasi'
        };
    }
}

export { renderOrder };
