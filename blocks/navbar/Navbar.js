class Navbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <link rel="stylesheet" href="./blocks/navbar/Navbar.css">
            <div class="nav-body">
                <button class="nav-button-burger">≡</button> 
                <h1>Qitchen</h1>
                <p>Menu</p>
                <p>About</p>
                <button class="nav-button-reservation">Book A Table</button>
            </div>
            <div class="nav-body" style="margin-left:65%;">
                <a href="#" class="action-link">🙎</a>
                <a href="#" class="action-link">🛒</a>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const button = this.shadowRoot.querySelector('.nav-button');
        if (button) {
            button.addEventListener('click', () => {
                console.log('Navbar button clicked!');
            });
        }
    }

    disconnectedCallback() {
        const button = this.shadowRoot.querySelector('.nav-button');
        if (button) {
            button.removeEventListener('click', () => {
                console.log('Navbar button clicked!');
            });
        }
    }
}

customElements.define('navbar-component', Navbar);