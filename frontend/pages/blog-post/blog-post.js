// blog-post.js
import { fakePosts } from "../../mockdata/fakePostsData.js"; // Import the fake data

export class BlogPost extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <link rel="stylesheet" href="styles.css">
            <div class="blog-post-container">
                <div class="left-section">
                    <img id="main-post-image" src="img/blog-post-main.png" alt="Manos de chef cortando salmón">
                    <div class="overlay-content">
                        </div>
                </div>
                <div class="right-section">
                    <div class="article-meta">
                        <span class="date" id="post-date"></span>
                    </div>
                    <h1 class="article-title" id="post-title"></h1>

                    <div class="article-content" id="post-content">
                        </div>

                    <div class="author-info">
                        <span class="author-label">Author:</span> <span class="author-name" id="post-author"></span>
                    </div>

                    <div class="footer-links">
                        <a href="#">Licensing</a>
                        <a href="#">Styleguide</a>
                    </div>
                </div>
            </div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Get references to the elements that will display dynamic content
        this.postTitleElement = this.shadowRoot.getElementById('post-title');
        this.postDateElement = this.shadowRoot.getElementById('post-date');
        this.postContentElement = this.shadowRoot.getElementById('post-content');
        this.postAuthorElement = this.shadowRoot.getElementById('post-author');
        this.mainPostImageElement = this.shadowRoot.getElementById('main-post-image');
    }

    connectedCallback() {
        console.log('Blog Post component added to the DOM');
        this.loadBlogPost();
    }

    disconnectedCallback() {
        console.log('Blog Post component removed from the DOM');
    }

    async loadBlogPost() {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');

        if (!postId) {
            console.error('No post ID found in URL parameters.');
            this.postTitleElement.textContent = 'Error: Post not found';
            this.postContentElement.innerHTML = '<p>Please select a blog post from the main blog page.</p>';
            return;
        }

        // Find the post from the imported fakePosts data
        const post = fakePosts.find(p => p.Id === parseInt(postId));

        if (post) {
            this.postTitleElement.textContent = post.Nombre;
            this.postDateElement.textContent = new Date(post.Fecha).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).toUpperCase();

            // Handle plain text content: split by newlines to create paragraphs
            const paragraphs = post.Contenido.split('\n').filter(p => p.trim() !== ''); // Filter out empty lines
            this.postContentElement.innerHTML = paragraphs.map(p => `<p>${p.trim()}</p>`).join('');

            this.postAuthorElement.textContent = post.Autor;
            this.mainPostImageElement.src = post.ImageUrl;
            this.mainPostImageElement.alt = post.AltText;
        } else {
            this.postTitleElement.textContent = 'Post not found';
            this.postContentElement.innerHTML = '<p>The requested blog post could not be found.</p>';
            this.postAuthorElement.textContent = 'N/A';
            this.postDateElement.textContent = '';
            this.mainPostImageElement.src = 'https://placehold.co/1200x800/eeeeee/000000?text=Post+Not+Found';
            this.mainPostImageElement.alt = 'Placeholder image for not found post.';
        }
    }
}

customElements.define('blog-post-component', BlogPost);
