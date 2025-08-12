// Sample products
const products = [
    { name: "Smartphone", category: "electronics", price: 15000, img: "https://via.placeholder.com/200" },
    { name: "T-shirt", category: "clothing", price: 800, img: "https://via.placeholder.com/200" },
    { name: "Laptop", category: "electronics", price: 55000, img: "https://via.placeholder.com/200" },
    { name: "Watch", category: "accessories", price: 2000, img: "https://via.placeholder.com/200" },
    { name: "Shoes", category: "clothing", price: 3000, img: "https://via.placeholder.com/200" },
    { name: "Headphones", category: "electronics", price: 900, img: "https://via.placeholder.com/200" }
];

// DOM elements
const productList = document.getElementById("product-list");
const categoryFilters = document.querySelectorAll(".filter-category");
const priceFilters = document.querySelectorAll(".filter-price");

// Function to display products
function displayProducts(items) {
    productList.innerHTML = "";
    if (items.length === 0) {
        productList.innerHTML = "<p>No products found.</p>";
        return;
    }
    items.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <h4>${p.name}</h4>
            <p class="price">₹${p.price}</p>
        `;
        productList.appendChild(card);
    });
}

// Filtering function
function filterProducts() {
    let selectedCategories = [...categoryFilters].filter(c => c.checked).map(c => c.value);
    let selectedPrices = [...priceFilters].filter(p => p.checked).map(p => p.value);

    let filtered = products.filter(p => {
        let categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category);
        let priceMatch = false;

        if (selectedPrices.length === 0) {
            priceMatch = true;
        } else {
            selectedPrices.forEach(priceRange => {
                if (priceRange === "low" && p.price < 1000) priceMatch = true;
                if (priceRange === "medium" && p.price >= 1000 && p.price <= 5000) priceMatch = true;
                if (priceRange === "high" && p.price > 5000) priceMatch = true;
            });
        }

        return categoryMatch && priceMatch;
    });

    displayProducts(filtered);
}

// Event listeners
categoryFilters.forEach(filter => filter.addEventListener("change", filterProducts));
priceFilters.forEach(filter => filter.addEventListener("change", filterProducts));

// Initial load
displayProducts(products);
