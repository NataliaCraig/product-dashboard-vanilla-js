async function fetchProducts() {
    const container = document.getElementById("product-container");

    try {
        container.innerHTML = "<p>Loading products...</p>";

        const response = await fetch("https://www.course-api.com/javascript-store-products");

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        displayProducts(data);

    } catch (error) {
        handleError(error);
    }
}

function displayProducts(products) {
    const container = document.getElementById("product-container");
    container.innerHTML = "";

    const firstFive = products.slice(0, 5);

    const productHTML = firstFive.map(product => {
        const { name, price, image } = product.fields;

        return `
            <div class="product-card">
                <img src="${image[0].url}" alt="${name}" loading="lazy">
                <h3>${name}</h3>
                <p>$${(price / 100).toFixed(2)}</p>
            </div>
        `;
    }).join("");

    container.innerHTML = productHTML;
}

function handleError(error) {
    const container = document.getElementById("product-container");
    container.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
}

fetchProducts();
