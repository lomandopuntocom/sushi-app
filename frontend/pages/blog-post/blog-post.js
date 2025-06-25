// blog-post.js
export class BlogPost extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <link rel="stylesheet" href="styles.css"> <div class="blog-post-container">
                <div class="left-section">
                    <img src="img/blog-post-main.png" alt="Manos de chef cortando salmón">
                    <div class="overlay-content">
                        </div>
                </div>
                <div class="right-section">
                    <div class="article-meta">
                        <span class="date">24TH AUG 2023</span>
                    </div>
                    <h1 class="article-title">HOW QITCHEN REDEFINES<br>FLAVOR HARMONY IN<br>EVERY BITE</h1>

                    <div class="article-content">
                        <h2 class="section-title">UNVEILING CULINARY ARTISTRY: A JOURNEY INTO QITCHEN'S SOUL</h2>
                        <p>In a world where dining experiences often blend into the ordinary, Qitchen stands as an emblem of culinary passion redefined. Beyond being a restaurant that serves sushi, Qitchen is an embodiment of dedication, creativity, and a profound love for the culinary gastronomy. As you step through its doors, you are not merely entering a dining place; you are being ushered into an experience that goes beyond the boundaries of any traditional dining encounter.</p>

                        <h2 class="section-title">CRAFTING A FEAST FOR THE SENSES</h2>
                        <p>The heart of Qitchen's allure lies in its meticulous attention to every detail, from the selection of ingredients to the presentation of each dish. What is renowned for its exceptional sushi, Qitchen's passion for perfection extends to every facet of its culinary journey. The talented chefs create a symphony of flavors, meticulously blending textures and aromas to create a multisensory masterpiece.</p>
                        <p>The restaurant itself speaks of a story where modern elegance meets warm, inviting ambiance to relish not only the food but also the atmosphere that envelops them. Each dish that graces the table is not just a meal; it's a tale told through taste – a testament to the tireless commitment Qitchen has toward crafting an experience for restaurant’s food mastery and devotion to it.</p>

                        <h2 class="section-title">BEYOND SUSHI: NURTURING CONNECTIONS</h2>
                        <p>While the gastronomic delights are undoubtedly the centerpiece, Qitchen goes beyond to create a culinary haven. It's a place that fosters conversations, where connections flow as smoothly as the sakes, and memories turn into cherished moments. The passionate team at Qitchen believes that dining is an act of bonding – a chance to share joy, laughter, and stories over a beautifully laid table.</p>
                        <p>The Qitchen experience transcends the physical walls of the restaurant. It's an invitation to delve into the culinary art and into a world where passion for food is an art, and every plate is a cherished canvas. Through the symphony of flavors, the artistry of presentation, and the warmth of connection, Qitchen invites you to witness passion personified in every aspect of your dining journey.</p>

                        <div class="author-info">
                            <span class="author-label">Author:</span> <span class="author-name">Name</span>
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
        console.log('Blog Post component added to the DOM');
        // Asegúrate de que todas las imágenes referenciadas existan en tus assets
    }

    disconnectedCallback() {
        console.log('Blog Post component removed from the DOM');
    }
}

customElements.define('blog-post-component', BlogPost);