// pages/menu-overlay/menu-overlay.js
import { Router } from '../../scripts.js'; // Asumiendo que 'scripts.js' es donde está tu Router

export class MenuOverlay extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <link rel="stylesheet" href="styles.css">
            <div class="menu-overlay-container">
                <button class="close-menu-button">X</button>
                <div class="menu-overlay-content">
                    <a class="overlay-nav-link" href="/menu">MENU</a>
                    <a class="overlay-nav-link" href="/reservation">RESERVATION</a>
                    <a class="overlay-nav-link" href="/about">ABOUT</a>
                    <a class="overlay-nav-link" href="/contact">CONTACT</a>
                    <a class="overlay-nav-link" href="/blog">BLOG</a>
                    <a class="overlay-nav-link" href="/profile">PROFILE</a>
                </div>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const closeButton = this.shadowRoot.querySelector('.close-menu-button');
        const overlayContainer = this.shadowRoot.querySelector('.menu-overlay-container');

        // Event listener para cerrar el menú
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                overlayContainer.classList.remove('open');
                document.body.style.overflow = ''; // Restaurar scroll del cuerpo
                // Emitir un evento personalizado para que la navbar sepa que debe cerrarse
                this.dispatchEvent(new CustomEvent('menu-closed', { bubbles: true, composed: true }));
            });
        }

        // Manejo de la navegación para todos los enlaces del overlay
        this.shadowRoot.querySelectorAll('.overlay-nav-link').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const href = event.target.getAttribute('href');
                Router.go(href);
                // Cerrar el menú después de navegar
                overlayContainer.classList.remove('open');
                document.body.style.overflow = '';
                this.dispatchEvent(new CustomEvent('menu-closed', { bubbles: true, composed: true }));
            });
        });
    }

    disconnectedCallback() {
        const closeButton = this.shadowRoot.querySelector('.close-menu-button');
        if (closeButton) {
            closeButton.removeEventListener('click', () => { /* ... */ });
        }
        this.shadowRoot.querySelectorAll('.overlay-nav-link').forEach(link => {
            link.removeEventListener('click', () => { /* ... */ });
        });
    }

    // Método para abrir el menú desde fuera (e.g., desde la Navbar)
    openMenu() {
        this.shadowRoot.querySelector('.menu-overlay-container').classList.add('open');
        document.body.style.overflow = 'hidden'; // Deshabilitar scroll del cuerpo
    }

    // Método para cerrar el menú desde fuera
    closeMenu() {
        this.shadowRoot.querySelector('.menu-overlay-container').classList.remove('open');
        document.body.style.overflow = '';
    }
}

customElements.define('menu-overlay-component', MenuOverlay);