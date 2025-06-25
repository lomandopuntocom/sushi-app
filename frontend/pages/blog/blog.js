// blog.js
export class Blog extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <link rel="stylesheet" href="styles.css"> <div class="blog-container">
                <div class="left-section">
                    <img src="img/blog-main.png" alt="Personas fotografiando platos de comida">
                    <div class="overlay-content">
                        <h1>BLOG</h1>
                    </div>
                </div>
                <div class="right-section">
                    <div class="blog-header">
                        <span class="small-text">BEHIND THE SCENES</span>
                        <h2>& LATEST NEWS</h2>
                    </div>

                    <div class="articles-list">
                        <div class="blog-article">
                            <img src="img/post.png" alt="Manos cortando salmón">
                            <div class="article-content">
                                <h3>CULINARY CRAFTSMANSHIP</h3>
                                <p>Delve into the precise techniques behind our signature sushi creations.</p>
                            </div>
                        </div>
                        <div class="blog-article">
                            <img src="img/post.png" alt="Mano sosteniendo un teléfono con un plato">
                            <div class="article-content">
                                <h3>THE ART OF FOOD PHOTOGRAPHY</h3>
                                <p>Tips and tricks for capturing mouth-watering images of your dishes.</p>
                            </div>
                        </div>
                        <div class="blog-article">
                            <img src="img/post.png" alt="Corte de tomate y atún">
                            <div class="article-content">
                                <h3>SEASONAL INGREDIENTS SPOTLIGHT</h3>
                                <p>Discover the freshest produce we're featuring on our menu this month.</p>
                            </div>
                        </div>
                        <div class="blog-article">
                            <img src="img/post.png" alt="Persona espolvoreando algo sobre un tazón">
                            <div class="article-content">
                                <h3>FROM FARM TO TABLE</h3>
                                <p>Our commitment to sourcing local and sustainable ingredients.</p>
                            </div>
                        </div>
                        <div class="blog-article">
                            <img src="img/post.png" alt="Manos preparando una ensalada">
                            <div class="article-content">
                                <h3>HEALTHY EATING WITH QITCHEN</h3>
                                <p>Explore our nutritious and delicious options for a balanced diet.</p>
                            </div>
                        </div>
                    </div>

                    <div class="footer-links">
                        <a href="#">Licensing</a>
                        <a href="#">Styleguide</a>
                    </div>
                </div>
            </div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        console.log('Blog component added to the DOM');
        // Asegúrate de que todas las imágenes referenciadas existan en tus assets
    }

    disconnectedCallback() {
        console.log('Blog component removed from the DOM');
    }
}

customElements.define('blog-component', Blog);