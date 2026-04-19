const container = document.getElementById('products-container');
const search  = document.getElementById('search');

let products = [];
let allProducts = [];

fetch('https://dummyjson.com/products')
.then(res => res.json())
.then((data) => {
    products = data?.products;
    allProducts = data?.products;
    renderProducts();
});

function renderProducts() {
    container.innerHTML = "";
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product';
        const productTitle = document.createElement('h3');
        productTitle.textContent = product.title;
        productCard.appendChild(productTitle);
        container.appendChild(productCard);

        const productDetails = document.createElement('div');
        productDetails.className = 'productDetails hidden';
        productDetails.innerHTML = `
                <p><strong>Desc: </strong> ${product.description}</> <br>
                <i>Price: ${product.price}</i>
            `
        productCard.appendChild(productDetails);

        productCard.addEventListener('click', () => {
            const details = productCard.querySelector('.productDetails');
            details.classList.toggle('hidden');
        })
    })
}

 search.addEventListener('input', () => {
    const filteredProducts = allProducts.filter(p => p.title.toLowerCase().includes(search.value.toLowerCase()));
    products = filteredProducts;
    renderProducts();
})