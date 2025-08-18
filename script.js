// const http = require('node:http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello, World!\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


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
        { name: 'Product 1', price: 19.99 },
        { name: 'Product 2', price: 29.99 },
        { name: 'Product 3', price: 39.99 },
        { name: 'Product 4', price: 49.99 },
        { name: 'Product 5', price: 59.99 },
    ];
    await Product.insertMany(products);
    console.log('Products added to the database');
}

app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});