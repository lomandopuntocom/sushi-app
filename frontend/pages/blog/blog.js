import authService from '../../services/authService.js';

export class Blog extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.user = authService.checkIfUserExist();
        this.selectedTab = 'all';
        this.savedBlogIds = [];
        this.currentUserId = null;

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

                    <div class="blog-tabs">
                        <button class="tab-btn" data-tab="all">Todos</button>
                        <button class="tab-btn" data-tab="saved">Guardados</button>
                        <button class="tab-btn" data-tab="mine">Mis Blogs</button>
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
            // Si hay usuario, obtener publicaciones guardadas
            if (this.user) {
                await this.fetchSavedBlogs();
            }
            this.loadBlogPosts();
        } catch (error) {
            console.error('Error al cargar los datos del blog:', error);
            const articlesList = this.shadowRoot.querySelector('.articles-list');
            articlesList.innerHTML = '<p>Error al cargar los datos del blog.</p>';
        }
    }

    async fetchSavedBlogs() {
        try {
            const res = await fetch(`http://localhost:3000/api/blog/saved/${this.user.id}`);
            if (res.ok) {
                const saved = await res.json();
                this.savedBlogIds = saved.map(p => p.id);
            } else {
                this.savedBlogIds = [];
            }
        } catch (error) {
            this.savedBlogIds = [];
        }
    }

    connectedCallback() {
        console.log('Blog component added to the DOM');
        const addPostButton = this.shadowRoot.querySelector('#add-post-button');
        if (addPostButton) {
            addPostButton.addEventListener('click', this.navigateToAddPost);
        }
        const tabButtons = this.shadowRoot.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleTabClick(e));
        });
        this.updateTabSelection();
    }

    disconnectedCallback() {
        console.log('Blog component removed from the DOM');
        const addPostButton = this.shadowRoot.querySelector('#add-post-button');
        if (addPostButton) {
            addPostButton.removeEventListener('click', this.navigateToAddPost);
        }
        // Remover eventos de los tabs
        const tabButtons = this.shadowRoot.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.removeEventListener('click', this.handleTabClick);
        });
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
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('blog-article');
            articleDiv.dataset.postId = post.id;

            const summary = post.contenido.substring(0, 150) + (post.contenido.length > 150 ? '...' : '');

            // Banderín de guardado
            const isSaved = this.savedBlogIds && this.savedBlogIds.includes(post.id);
            const flagButton = document.createElement('button');
            flagButton.className = 'save-flag-btn';
            flagButton.title = isSaved ? 'Guardado' : 'Guardar publicación';
            flagButton.innerHTML = isSaved ? '🚩' : '🏳️';
            if (isSaved) flagButton.classList.add('saved');
            flagButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleSavePost(post.id, flagButton);
            });

            articleDiv.innerHTML = `
                <img src="img/blog-post-main.png" alt="Imagen generica">
                <div class="article-content">
                    <h3>${post.nombre}</h3>
                    <p>${summary}</p>
                    <span class="article-meta">By ${post.autor} on ${new Date(post.fecha).toLocaleDateString()}</span>
                </div>
            `;

            // Insertar el banderín en la esquina de la tarjeta
            articleDiv.style.position = 'relative';
            flagButton.style.position = 'absolute';
            flagButton.style.top = '10px';
            flagButton.style.right = '10px';
            articleDiv.appendChild(flagButton);

            articleDiv.addEventListener('click', () => {
                window.location.href = `/blog-post?id=${post.id}`;
            });

            articlesList.appendChild(articleDiv);
        });
    }

    // Guardar publicación
    async handleSavePost(postId, flagButton) {
        if (!this.user) {
            alert('Debes iniciar sesión para guardar publicaciones');
            return;
        }
        try {
            const res = await fetch('http://localhost:3000/api/blog/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idusuario: this.user.id, idpublicacion: postId })
            });
            if (res.ok) {
                if (!this.savedBlogIds.includes(postId)) this.savedBlogIds.push(postId);
                flagButton.innerHTML = '🚩';
                flagButton.classList.add('saved');
                flagButton.title = 'Guardado';
            } else {
                alert('No se pudo guardar la publicación');
            }
        } catch (e) {
            alert('Error de red al guardar publicación');
        }
    }

    // Manejar click en los tabs
    handleTabClick(e) {
        const tab = e.target.dataset.tab;
        if (tab && this.selectedTab !== tab) {
            this.selectedTab = tab;
            this.updateTabSelection();
            this.loadBlogPosts();
        }
    }

    // Actualizar visualmente el tab seleccionado
    updateTabSelection() {
        const tabButtons = this.shadowRoot.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            if (btn.dataset.tab === this.selectedTab) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}

customElements.define('blog-component', Blog);