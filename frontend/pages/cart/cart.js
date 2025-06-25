// cart.js
export class Cart extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <link rel="stylesheet" href="styles.css"> <div class="cart-container">
                <div class="left-section">
                    <img src="img/cart-main.png" alt="A person holding a bowl of food">
                    <div class="overlay-content">
                        <h1>CART</h1>
                    </div>
                </div>
                <div class="right-section">
                    <div class="cart-header">
                        <h2>MY CART</h2>
                    </div>

                    <div class="cart-items-list">
                        <div class="cart-item">
                            <img src="img/dish.png" alt="Spicy Tuna Maki">
                            <div class="item-details">
                                <h3 class="item-name">SPICY TUNA MAKI</h3>
                                <p class="item-description">A sizzling blend of spicy tuna, cucumber, and avocado, harmonically rolled in nori and seasoned rice.</p>
                            </div>
                            <div class="item-price-qty">
                                <span class="qty">$5 X 10 =</span> <span class="price">$50</span>
                            </div>
                        </div>

                        <div class="cart-item">
                            <img src="img/dish2.png" alt="Mango Maki">
                            <div class="item-details">
                                <h3 class="item-name">MANGO MAKI</h3>
                                <p class="item-description">Tempura fried shrimp, cucumber, and cream cheese, embrace a center of fresh avocado, creating a surprising contrast of textures.</p>
                            </div>
                            <div class="item-price-qty">
                                <span class="qty">$5 X 5 =</span> <span class="price">$25</span>
                            </div>
                        </div>
                    </div>

                    <div class="cart-total">
                        <span class="total-label">TOTAL</span>
                        <span class="total-amount">$75</span>
                    </div>

                    <button type="button" class="place-order-button">PLACE ORDER</button>

                    <div class="footer-links">
                        <a href="#">Licensing</a>
                        <a href="#">Styleguide</a>
                    </div>
                </div>
            </div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        console.log('Cart component added to the DOM');
        const placeOrderBtn = this.shadowRoot.querySelector('.place-order-button');
        if (placeOrderBtn) {
            placeOrderBtn.addEventListener('click', this.handlePlaceOrder.bind(this));
        }
    }

    disconnectedCallback() {
        console.log('Cart component removed from the DOM');
        const placeOrderBtn = this.shadowRoot.querySelector('.place-order-button');
        if (placeOrderBtn) {
            placeOrderBtn.removeEventListener('click', this.handlePlaceOrder.bind(this));
        }
    }

    handlePlaceOrder() {
        // In a real application, you would send the cart data to a backend
        // and handle the order placement logic here.
        alert('Order Placed! (This is a simulation)');
        console.log('Place Order button clicked');
        // Optionally, clear the cart or redirect to a confirmation page
    }
}

customElements.define('cart-component', Cart);