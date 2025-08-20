let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = cart.length;

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    cartCount++;
    updateCartCount();
    saveCartToLocalStorage();
    alert(`${productName} added to cart!`);
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cartCount;
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

updateCartCount();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
});

const Product = mongoose.model('Product', productSchema);

async function addProducts() {
    const products = [
        { name: 'audi rs7', price: 140000 },
        { name: 'audi rs6', price: 130000 },
        { name: 'audi rs5', price: 45000 },
        { name: 'audi Q8', price: 85000 },
        { name: 'audi rs5', price: 35000 },
        { name: 'audi rs6', price: 65000},
        { name: 'audi rs8', price: 160000},
        { name: 'toyota 4runner', price: 35000},

    ];
    await Product.insertMany(products);
    console.log('Products added to the database');
}

app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

