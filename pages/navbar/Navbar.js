import { Router } from '../../scripts.js';

export class Navbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <link rel="stylesheet" href="./styles.css">
            <div class="first-navbar-body">
                <button class="first-navbar-button-burger">≡</button>
                <a class="first-navbar-logo nav-link" href="/">Qitchen</a>
                <a class="first-navbar-link nav-link" href="/menu">Menu</a>
                <a class="first-navbar-link nav-link" href="/about">About</a>
                <button class="first-navbar-button-reservation">Book A Table</button>
            </div>
            <div class="second-navbar-body" style="margin-left:40%">
                <a href="#" class="secon-navbar-button">🙎</a>
                <a href="#" class="secon-navbar-button">🛒</a>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const navButton = this.shadowRoot.querySelector('.first-navbar-button-burger');
        if (navButton) {
            navButton.addEventListener('click', () => {
                console.log('Navbar burger button clicked!');
            });
        }

        this.shadowRoot.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const href = event.target.getAttribute('href');
                Router.go(href);
            });
        });
    }

    disconnectedCallback() {
        this.shadowRoot.querySelectorAll('.nav-link').forEach(link => {
            link.removeEventListener('click', (event) => {
            });
        });

        const navButton = this.shadowRoot.querySelector('.first-navbar-button-burger');
        if (navButton) {
            navButton.removeEventListener('click', () => {
                console.log('Navbar burger button clicked!');
            });
        }
    }
}

customElements.define('navbar-component', Navbar);