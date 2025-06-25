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
                            <button class="main-card-info-button" data-href="/menu">→</button> </div>
                    </li>
                    <li class="main-card" style="background-image: url(img/card2.png);"> <div class="main-card-info">
                            <h3>Reservation</h3>
                            <button class="main-card-info-button" data-href="/reservation">→</button> </div>
                    </li>
                    <li class="main-card" style="background-image: url(img/card3.png);"> <div class="main-card-info">
                            <h3>About</h3>
                            <button class="main-card-info-button" data-href="/about">→</button> </div>
                    </li>
                </ul>
            </div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        console.log('FrontPage component added to the DOM');

        // Seleccionar todos los botones de las tarjetas
        const navButtons = this.shadowRoot.querySelectorAll('.main-card-info-button');

        // Añadir event listener a cada botón
        navButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault(); // Evitar comportamiento predeterminado si lo hubiera
                const href = event.target.dataset.href; // Obtener la ruta del atributo data-href
                if (href) {
                    Router.go(href); // Navegar usando el Router
                }
            });
        });

        // Opcional: Si quieres que toda la tarjeta sea clickable, podrías añadir un listener a `li.main-card`
        // y obtener el `data-href` de un atributo en el `li` o del botón dentro.
        // Por ahora, solo el botón es clickable.
    }

    disconnectedCallback() {
        console.log('FrontPage component removed from the DOM');
        // Es una buena práctica limpiar los event listeners para evitar fugas de memoria
        const navButtons = this.shadowRoot.querySelectorAll('.main-card-info-button');
        navButtons.forEach(button => {
            // Para remover el listener, necesitarías la misma función de callback,
            // lo que a menudo implica definir la función fuera del listener y referenciarla.
            // Para listeners sencillos añadidos en connectedCallback que se limpian cuando el elemento se quita,
            // no siempre es estrictamente necesario, pero es una buena práctica general.
            // button.removeEventListener('click', this._boundClickHandler); // Si _boundClickHandler fuera una referencia
        });
    }
}

customElements.define('frontpage-component', frontPage);