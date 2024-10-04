

function displayCart() {
    const cart = getCart();
    const cartTableBody = document.querySelector('.cart-table tbody');
    cartTableBody.innerHTML = ''; // Clear current cart display

    let subtotal = 0;

    // Populate cart items
    cart.forEach(item => {
        const total = item.price * item.quantity;
        subtotal = subtotal+total;
        console.log("subtotal", subtotal)

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="pro">
                    <img src=${item.image} alt="Product Image">
                    <span>${item.name}</span>
                </div>
            </td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', this.value)">
            </td>
            <td>$${total.toFixed(2)}</td>
            <td><button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button></td>
        `;
        cartTableBody.appendChild(row);
    });

    // Update summary
    const tax = subtotal * 0.1; // Assuming 10% tax
    const deliveryCharge = 0; // Assuming free delivery
    const total = subtotal + deliveryCharge;
    console.log(`Subtotal: $${subtotal.toFixed(2)}, Tax: $${tax.toFixed(2)}, Total: $${total.toFixed(2)}`); // Debugging log

    if (isNaN(subtotal) || isNaN(tax) || isNaN(total)) {
        console.error("Invalid values for subtotal, tax, or total:", { subtotal, tax, total });
        return; // Exit if there's an error
    }

    // document.querySelector('.summary-item:nth-child(1) span:nth-child(2)').innerText = $${subtotal.toFixed(2)};
    // document.querySelector('.summary-item:nth-child(2) span:nth-child(2)').innerText = $${tax.toFixed(2)};
    document.querySelector('.summary-item:nth-child(3) span:nth-child(2)').innerText = 'Free';
    document.querySelector('.total span:nth-child(2)').innerText = `$${total.toFixed(2)}`;
}

// Function to update quantity in the cart
function updateQuantity(name, quantity) {
    const cart = getCart();
    const product = cart.find(item => item.name === name);
    
    if (product) {
        product.quantity = parseInt(quantity);
        saveCart(cart);
        displayCart();
    }
}
// Initial display of the cart
displayCart();

function removeFromCart(name) {
    let cart = getCart();
    cart = cart.filter(item => item.name !== name); // Remove product
    saveCart(cart);
    displayCart();
}

function addToCart(name,image,price){
        const cart = getCart();
        const product = { name, image, price };
        
        // Check if the product already exists in the cart
        const existingProduct = cart.find(item => item.name === name);
        if (existingProduct) {
            existingProduct.quantity += 1; // Increase quantity
        } else {
            product.quantity = 1; // Set initial quantity
            cart.push(product); // Add new product to the cart
        }
    
        saveCart(cart);
}
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : []; // Return parsed cart or empty array
}

// Function to save the cart to Local Storage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart as string
}