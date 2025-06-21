class App extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <link rel="stylesheet" href="./blocks/frontpage/frontpage.css">
            <div class="front-body">
                <div class="front-image" style="background-image: url(./img/main.png);">
                <h3>SUSHI <br> SENSATION</h1>
                <div class="front-social-list">    
                    <button class="front-social-button">🟦</button>
                    <button class="front-social-button">🐤</button>
                    <button class="front-social-button">📷</button>
                </div>
                </div>
                <ul class="front-card-list">
                    <li class="front-card" style="background-image: url(./img/card1.png);">
                        <div class="front-card-info">
                            <h3>Menu</h3>
                            <button class="front-card-info-button">→</button>
                        </div>
                    </li>
                    <li class="front-card" style="background-image: url(./img/card2.png);">
                        <div class="front-card-info">
                            <h3>Reservation</h3>
                            <button class="front-card-info-button">→</button>
                        </div>
                    </li>
                    <li class="front-card" style="background-image: url(./img/card3.png);">
                        <div class="front-card-info">
                            <h3>About</h3>
                            <button class="front-card-info-button">→</button>
                        </div>
                    </li>
                </ul>
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

customElements.define('app-component', App);