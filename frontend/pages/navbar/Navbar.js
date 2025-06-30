import { MenuOverlay } from '../menu-overlay/menu-overlay.js';
import authService from '../../services/authService.js';

export class Navbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <link rel="stylesheet" href="./styles.css">
            <div class="first-navbar-body">
                <a class="first-navbar-button-burger">≡</a>
                <a class="first-navbar-logo nav-link" href="/">Qitchen</a>
                <a class="first-navbar-link nav-link desktop-only" href="/menu">Menu</a>
                <a class="first-navbar-link nav-link desktop-only" href="/about">About</a>
                <a class="first-navbar-button-reservation nav-link desktop-only" href="/reservation">Book A Table</a>
            </div>
            <div class="second-navbar-body" style="margin-left:40%">
                <div id="auth-status-container"></div> 
                <a id="cart-button" class="secon-navbar-button nav-link">🛒</a> 
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Bindeamos el método para que 'this' siempre se refiera a la instancia del componente
        this.boundUpdateAuthStatus = this.updateAuthStatus.bind(this);
    }

    connectedCallback() {
        const navButton = this.shadowRoot.querySelector('.first-navbar-button-burger');
        let menuOverlay = document.querySelector('menu-overlay-component');
        if (!menuOverlay) {
            menuOverlay = document.createElement('menu-overlay-component');
            document.body.appendChild(menuOverlay);
        }

        if (navButton) {
            navButton.addEventListener('click', () => {
                menuOverlay.openMenu();
            });
        }

        const cartButton = this.shadowRoot.getElementById('cart-button');
        if (cartButton) {
            cartButton.addEventListener('click', this.handleCartClick.bind(this));
        }

        // Llamamos a updateAuthStatus al conectar el componente
        this.updateAuthStatus();

        // ESCUCHAR EL EVENTO PERSONALIZADO AQUÍ
        document.addEventListener('auth-status-changed', this.boundUpdateAuthStatus);
    }

    disconnectedCallback() {
        console.log('Navbar component removed from the DOM');
        const navButton = this.shadowRoot.querySelector('.first-navbar-button-burger');
        if (navButton) {
            navButton.removeEventListener('click', this.openMenu);
        }

        const cartButton = this.shadowRoot.getElementById('cart-button');
        if (cartButton) {
            cartButton.removeEventListener('click', this.handleCartClick);
        }

        // ELIMINAR EL LISTENER AL DESCONECTAR EL COMPONENTE
        document.removeEventListener('auth-status-changed', this.boundUpdateAuthStatus);
    }

    handleCartClick(event) {
        event.preventDefault();

        const user = authService.checkIfUserExist();
        if (user) {
            if (window.Router) {
                Router.go('/cart');
            } else {
                window.location.href = '/cart';
            }
        } else {
            if (window.Router) {
                Router.go('/login');
            } else {
                window.location.href = '/login';
            }
        }
    }

    updateAuthStatus() {
        const user = authService.checkIfUserExist();
        const authStatusContainer = this.shadowRoot.getElementById('auth-status-container');
        
        authStatusContainer.innerHTML = ''; // Limpiar contenido previo

        if (user) {
            const profileLink = document.createElement('a');
            profileLink.href = "/profile";
            profileLink.classList.add("secon-navbar-button", "nav-link");
            profileLink.textContent = "🙎";
            authStatusContainer.appendChild(profileLink);
        } else {
            const registerButton = document.createElement('a');
            registerButton.href = "/registration";
            registerButton.classList.add("register-button", "nav-link");
            registerButton.textContent = "Register";
            authStatusContainer.appendChild(registerButton);
        }
    }
}

customElements.define('navbar-component', Navbar);