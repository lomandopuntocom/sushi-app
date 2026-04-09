import toastService from './toastService.js';

// Global cart service to manage cart state across different pages
class CartService {
    constructor() {
        this.cartItems = this.loadCartFromLocalStorage();
        this.listeners = [];
        this.initGlobalListener();
    }

    initGlobalListener() {
        // Listen for add-to-cart events on the window
        window.addEventListener('add-to-cart', (event) => {
            this.addItemToCart(event.detail.dish);
        });
    }

    loadCartFromLocalStorage() {
        try {
            const storedCart = localStorage.getItem('qitchen-cart');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (e) {
            console.error("Error loading cart from local storage:", e);
            return [];
        }
    }

    saveCartToLocalStorage() {
        localStorage.setItem('qitchen-cart', JSON.stringify(this.cartItems));
        this.notifyListeners();
    }

    addItemToCart(dish) {
        console.log('CartService: Adding to cart:', dish);
        const existingItem = this.cartItems.find(item => item.id === dish.id);

        if (existingItem) {
            existingItem.quantity++;
            toastService.success(`${dish.nombre} - Cantidad actualizada a ${existingItem.quantity}`);
        } else {
            this.cartItems.push({ ...dish, quantity: 1 });
            toastService.success(`✓ ${dish.nombre} agregado al carrito`);
        }
        this.saveCartToLocalStorage();
    }

    removeItemFromCart(dishId) {
        this.cartItems = this.cartItems.filter(item => item.id !== dishId);
        this.saveCartToLocalStorage();
    }

    updateItemQuantity(dishId, change) {
        const item = this.cartItems.find(item => item.id === dishId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeItemFromCart(dishId);
            } else {
                this.saveCartToLocalStorage();
            }
        }
    }

    getCartItems() {
        return this.cartItems;
    }

    clearCart() {
        this.cartItems = [];
        this.saveCartToLocalStorage();
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }

    unsubscribe(listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    notifyListeners() {
        this.listeners.forEach(listener => listener(this.cartItems));
    }
}

// Singleton instance
export const cartService = new CartService();
export default cartService;
