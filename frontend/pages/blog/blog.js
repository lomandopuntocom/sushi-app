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

                    <button id="add-post-button" class="add-post-button">Add New Post</button>

                    <div class="footer-links">
                        <a href="#">Licensing</a>
                        <a href="#">Styleguide</a>
                    </div>
                </div>
            </div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.fetchBlogData();
    }

    async fetchBlogData() {
        try {
            const response = await fetch('http://localhost:3000/api/blog');
            const data = await response.json();

            this.blogData = data.publicaciones;
            this.loadBlogPosts();
        } catch (error) {
            console.error('Error al cargar los datos del blog:', error);
            const articlesList = this.shadowRoot.querySelector('.articles-list');
            articlesList.innerHTML = '<p>Error al cargar los datos del blog.</p>';
        }
    }

    connectedCallback() {
        console.log('Blog component added to the DOM');
        const addPostButton = this.shadowRoot.querySelector('#add-post-button');
        if (addPostButton) {
            addPostButton.addEventListener('click', this.navigateToAddPost);
        }
    }

    disconnectedCallback() {
        console.log('Blog component removed from the DOM');
        const addPostButton = this.shadowRoot.querySelector('#add-post-button');
        if (addPostButton) {
            addPostButton.removeEventListener('click', this.navigateToAddPost);
        }
    }

    navigateToAddPost() {
        window.location.href = '/add-blog-post';
    }

    async loadBlogPosts() {
        const articlesList = this.shadowRoot.querySelector('.articles-list');
        articlesList.innerHTML = '';

        if (!this.blogData || this.blogData.length === 0) {
            articlesList.innerHTML = '<p>No blog posts available.</p>';
            return;
        }

<<<<<<< HEAD
        if (this.selectedTab === 'saved' && !this.user) {
            articlesList.innerHTML = '<p>Debes iniciar sesión para ver los guardados.</p>';
            return;
        }

        if (this.selectedTab === 'mine' && !this.user) {
            articlesList.innerHTML = '<p>Debes iniciar sesión para ver tus blogs.</p>';
            return;
        }

        let filteredPosts = [];
        if (this.selectedTab === 'all') {
            filteredPosts = this.blogData;
        } else if (this.selectedTab === 'saved') {
            filteredPosts = this.blogData.filter(post => this.savedBlogIds.includes(post.id));
        } else if (this.selectedTab === 'mine') {
            filteredPosts = this.blogData.filter(post => post.autorId === this.user.id);
        }

        if (filteredPosts.length === 0) {
            articlesList.innerHTML = '<p>No blog posts available en esta sección.</p>';
            return;
        }

        filteredPosts.forEach(post => {
=======
        this.blogData.forEach(post => {
>>>>>>> parent of 2910879 (implementacion inicio de sesion y CRUD de blogs)
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('blog-article');
            articleDiv.dataset.postId = post.id;

            const summary = post.contenido.substring(0, 150) + (post.contenido.length > 150 ? '...' : '');

            articleDiv.innerHTML = `
                <img src="img/blog-post-main.png" alt="Imagen generica">
                <div class="article-content">
                    <h3>${post.nombre}</h3>
                    <p>${summary}</p>
                    <span class="article-meta">By ${post.autor} on ${new Date(post.fecha).toLocaleDateString()}</span>
                </div>
            `;

            articleDiv.addEventListener('click', () => {
                window.location.href = `/blog-post?id=${post.id}`;
            });

            articlesList.appendChild(articleDiv);
        });
    }
}

customElements.define('blog-component', Blog);