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
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('menu-closed', { bubbles: true, composed: true }));
            });
        }
    }

    openMenu() {
        this.shadowRoot.querySelector('.menu-overlay-container').classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    closeMenu() {
        this.shadowRoot.querySelector('.menu-overlay-container').classList.remove('open');
        document.body.style.overflow = '';
    }
}

customElements.define('menu-overlay-component', MenuOverlay);