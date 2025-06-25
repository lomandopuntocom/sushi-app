export class BlogPost extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <link rel="stylesheet" href="styles.css">
            <div class="blog-post-container">
                <div class="left-section">
                    <img id="main-post-image" src="img/blog-post-main.png" alt="Blog Post Image">
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

        this.postTitleElement = this.shadowRoot.getElementById('post-title');
        this.postDateElement = this.shadowRoot.getElementById('post-date');
        this.postContentElement = this.shadowRoot.getElementById('post-content');
        this.postAuthorElement = this.shadowRoot.getElementById('post-author');
        this.mainPostImageElement = this.shadowRoot.getElementById('main-post-image');
        this.fetchBlogData();
    }

    async fetchBlogData() {
        try {
            const response = await fetch('http://localhost:3000/api/blog');
            const data = await response.json();

            this.blogData = data.publicaciones;

        } catch (error) {
            console.error('Error al cargar los datos del menú:', error);
            this.dishListContainer.innerHTML = '<p>Error al cargar los datos del menú.</p>';
        }
    }

    connectedCallback() {
        console.log('Blog Post component added to the DOM');
        this.fetchBlogData().then(() => {
            this.loadBlogPost();
        });
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
            this.mainPostImageElement.src = 'https://placehold.co/1200x800/eeeeee/000000?text=Error:+No+Post+ID';
            this.mainPostImageElement.alt = 'Error: No Post ID found';
            return;
        }

        const post = this.blogData.find(p => p.id === parseInt(postId));

        if (post) {
            this.postTitleElement.textContent = post.nombre;
            this.postDateElement.textContent = new Date(post.fecha).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).toUpperCase();

            const paragraphs = post.contenido.split('\n').filter(p => p.trim() !== '');
            this.postContentElement.innerHTML = paragraphs.map(p => `<p>${p.trim()}</p>`).join('');

            this.postAuthorElement.textContent = post.autor;
            if (post.image) {
                this.mainPostImageElement.src = post.image;
                this.mainPostImageElement.alt = post.title || 'Blog Post Image';
            } else {
                this.mainPostImageElement.src = 'img/blog-post-main.png';
                this.mainPostImageElement.alt = 'No image provided for this post.';
            }

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
