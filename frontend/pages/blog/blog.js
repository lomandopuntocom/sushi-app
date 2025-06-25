// blog.js
import { fakePosts } from "../../mockdata/fakePostsData.js"; // Import the fake data

export class Blog extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <link rel="stylesheet" href="styles.css">
            <div class="blog-container">
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
        this.loadBlogPosts();
    }

    disconnectedCallback() {
        console.log('Blog component removed from the DOM');
    }

    async loadBlogPosts() {
        const articlesList = this.shadowRoot.querySelector('.articles-list');
        articlesList.innerHTML = ''; // Clear existing static content

        // Use the imported fakePosts data
        fakePosts.forEach(post => {
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('blog-article');
            articleDiv.dataset.postId = post.Id; // Store post ID for potential future use

            // Create a truncated summary for the list view
            const summary = post.Contenido.substring(0, 150) + (post.Contenido.length > 150 ? '...' : '');

            articleDiv.innerHTML = `
                <img src="${post.ImageUrl}" alt="${post.AltText}">
                <div class="article-content">
                    <h3>${post.Nombre}</h3>
                    <p>${summary}</p>
                    <span class="article-meta">By ${post.Autor} on ${new Date(post.Fecha).toLocaleDateString()}</span>
                </div>
            `;

            articleDiv.addEventListener('click', () => {
                // Redirect to /blog-post when the article is clicked
                window.location.href = `/blog-post?id=${post.Id}`; // Pass ID as query parameter
            });

            articlesList.appendChild(articleDiv);
        });
    }
}

customElements.define('blog-component', Blog);

