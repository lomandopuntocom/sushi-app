export class menu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <link rel="stylesheet" href="./styles.css">
            <div class="menu-body">
                <div class="menu-image" style="background-image: url(./img/menu.png);">
                    <h3>MENU</h1>
                </div>
                <div class="menu-list-body">
                    <ul class="menu-filter-list">
                        <li class="menu-filter-card">
                            All
                        </li>
                        <li class="menu-filter-card">
                            Maki
                        </li>
                        <li class="menu-filter-card">
                            Uruaki
                        </li>
                        <li class="menu-filter-card">
                            Special
                        </li>
                    </ul>
                    <h1 class="menu-list-category">MAKI</h1>
                    <ul class="menu-list">
                        <li class="menu-card-body">
                            <div class="menu-card-image" style="background-image: url('img/dish.png')">
                                <button class="menu-card-button">+</button>
                            </div>
                            <div class="menu-card-info">
                                <div class="menu-card-info-header">
                                    <h2>Teriyaki</h2>
                                    <h2 class="menu-card-price">5$</h2>
                                </div>
                                <div class="menu-card-info-body">
                                    lorem ipsum dolor sit amet
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        console.log('App component added to the DOM');
    }

    disconnectedCallback() {
        console.log('App component removed from the DOM');
    }
}

customElements.define('menu-component', menu);