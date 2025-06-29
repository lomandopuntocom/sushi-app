export class frontPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <link rel="stylesheet" href="./styles.css">
            <div class="main-body">
                <div class="main-image" style="background-image: url(img/main.png);"> <h3>SUSHI <br> SENSATION</h3>
                    <div class="social-list">
                        <button class="social-button">🟦</button>
                        <button class="social-button">🐤</button>
                        <button class="social-button">📷</button>
                    </div>
                </div>
                <ul class="main-card-list">
                    <li class="main-card" style="background-image: url(img/card1.png);"> <div class="main-card-info">
                            <h3>Menu</h3>
                            <a class="main-card-info-button" href="/menu">→</a> </div>
                    </li>
                    <li class="main-card" style="background-image: url(img/card2.png);"> <div class="main-card-info">
                            <h3>Reservation</h3>
                            <a class="main-card-info-button" href="/reservation">→</a> </div>
                    </li>
                    <li class="main-card" style="background-image: url(img/card3.png);"> <div class="main-card-info">
                            <h3>About</h3>
                            <a class="main-card-info-button" href="/about">→</a> </div>
                    </li>
                </ul>
            </div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('frontpage-component', frontPage);