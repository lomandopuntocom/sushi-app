import { MenuOverlay } from '../menu-overlay/menu-overlay.js';

export class Navbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <link rel="stylesheet" href="./styles.css"> <div class="first-navbar-body">
                <a class="first-navbar-button-burger">≡</a>
                <a class="first-navbar-logo nav-link" href="/">Qitchen</a>
                <a class="first-navbar-link nav-link desktop-only" href="/menu">Menu</a>
                <a class="first-navbar-link nav-link desktop-only" href="/about">About</a>
                <a class="first-navbar-button-reservation nav-link desktop-only" href="/reservation">Book A Table</a>
            </div>
            <div class="second-navbar-body" style="margin-left:40%">
                <a href="/profile" class="secon-navbar-button nav-link">🙎</a>
                <a href="/cart" class="secon-navbar-button nav-link">🛒</a>
            </div>
            `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
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
    }
}

customElements.define('navbar-component', Navbar);