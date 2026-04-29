// Supabase Configuration
const SUPABASE_URL = 'https://cvzzzknyhgiycrybvlia.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2enp6a255aGdpeWNyeWJ2bGlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwOTE4MDYsImV4cCI6MjA5MTY2NzgwNn0.UxTRlHGn3OwxWw6FQMRjAHstyBCU6eHTn_UmXqV3shI';

const HEADERS = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json'
};

// Local image mappings: product name (lowercase) → image path
const MAKANAN_IMAGES = {
    'boncabe': 'img/makanan/boncabe.png',
    'keju cake': 'img/makanan/keju.png',
    'bakso': 'img/makanan/bakso.png',
    'mie sedap cup': 'img/makanan/mie sedap.png',
    'super star': 'img/makanan/superstar.png',
    'oreo soft cake': 'img/makanan/orea.jpg',
    'nasi nugget geprek': 'img/makanan/nasi naget.jpg',
    'beng beng': 'img/makanan/beng beng.png',
    'nasi ayam kremes': 'img/makanan/nasi telur.jpg',
    'puding stobery': 'img/makanan/puding.jpg'
};

const MINUMAN_IMAGES = {
    'pop ice': 'img/minuman/pop ice.png',
    'milkita': 'img/minuman/milkita.jpg',
    'frisian flag': 'img/minuman/es susu.png',
    'jasmine tea': 'img/minuman/jasmine tea.png',
    'es wawan': 'img/minuman/es wawan.png',
    'dancow': 'img/minuman/es dancow.png',
    'jus jambu': 'img/minuman/jus jambu.jpg'
};

/**
 * Get local image path for a product
 */
function getLocalImage(productName, category) {
    const name = (productName || '').trim().toLowerCase();
    if (category === 'MAKANAN') {
        return MAKANAN_IMAGES[name] || 'https://via.placeholder.com/400x240?text=No+Image';
    } else {
        return MINUMAN_IMAGES[name] || 'https://via.placeholder.com/400x240?text=No+Image';
    }
}

/**
 * Fetch all rows from a Supabase table
 */
export async function fetchTable(tableName, select = '*') {
    const url = `${SUPABASE_URL}/rest/v1/${encodeURIComponent(tableName)}?select=${select}`;

    const response = await fetch(url, { headers: HEADERS });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Supabase error (${response.status}): ${errorBody}`);
    }

    return response.json();
}

/**
 * Fetch mitra data from Supabase
 * Normalizes column names: Supabase has 'category', code expects 'kategori'
 */
export async function fetchMitra() {
    const data = await fetchTable('tabel_mitra');
    return data.map(item => ({
        mitra_id: item.mitra_id,
        mitra_name: item.mitra_name,
        owner_name: item.owner_name,
        email_owner: item.email_owner,
        address_owner: item.address_owner,
        kategori: item.category || '',
        sekolah: item.sekolah
    }));
}

/**
 * Fetch all produk (makanan + minuman) from Supabase
 * Uses local images from img/ folder instead of Google Drive URLs
 */
export async function fetchAllProduk() {
    const [makanan, minuman] = await Promise.all([
        fetchTable('tabelproduk_makanan'),
        fetchTable('tabelproduk_minuman')
    ]);

    // Normalize makanan fields
    const normalizedMakanan = makanan.map(item => {
        const name = (item.produkname || '').trim();
        return {
            produk_id: String(item.produk_id),
            mitra_id: String(item.mitra_id),
            produk_name: name,
            produk_price: String(item.produkprice || 0),
            produk_stock: String(item.produkstock || 0),
            produk_kategori: 'MAKANAN',
            produk_image: getLocalImage(name, 'MAKANAN'),
            sekolah: item.sekolah || ''
        };
    });

    // Normalize minuman fields
    const normalizedMinuman = minuman.map(item => {
        const name = (item.produk_name || '').trim();
        return {
            produk_id: String(item.produk_id),
            mitra_id: String(item.mitra_id),
            produk_name: name,
            produk_price: String(item.produkprice || 0),
            produk_stock: String(item.product_stock || 0),
            produk_kategori: 'MINUMAN',
            produk_image: getLocalImage(name, 'MINUMAN'),
            sekolah: item.sekolah || ''
        };
    });

    return [...normalizedMakanan, ...normalizedMinuman];
}

export { SUPABASE_URL, SUPABASE_ANON_KEY };
