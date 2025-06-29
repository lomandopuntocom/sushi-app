export class AddBlogPost extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <link rel="stylesheet" href="styles.css">
            <div class="add-post-container">
                <h2>Add New Blog Post</h2>
                <form id="add-post-form">
                    <div class="form-group">
                        <label for="post-title">Title:</label>
                        <input type="text" id="post-title" name="title" required>
                    </div>
                    <div class="form-group">
                        <label for="post-author">Author:</label>
                        <input type="text" id="post-author" name="author" required>
                    </div>
                    <div class="form-group">
                        <label for="post-content">Content:</label>
                        <textarea id="post-content" name="content" rows="10" required></textarea>
                    </div>
                    <button type="submit">Submit Post</button>
                    <button type="button" id="cancel-add-post">Cancel</button>
                </form>
            </div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        console.log('AddBlogPost component added to the DOM');
        const form = this.shadowRoot.querySelector('#add-post-form');
        form.addEventListener('submit', this.handleSubmit.bind(this));

        const cancelButton = this.shadowRoot.querySelector('#cancel-add-post');
        cancelButton.addEventListener('click', this.handleCancel);
    }

    disconnectedCallback() {
        console.log('AddBlogPost component removed from the DOM');
        const form = this.shadowRoot.querySelector('#add-post-form');
        form.removeEventListener('submit', this.handleSubmit.bind(this));

        const cancelButton = this.shadowRoot.querySelector('#cancel-add-post');
        cancelButton.removeEventListener('click', this.handleCancel);
    }

    async handleSubmit(event) {
        event.preventDefault();

        const title = this.shadowRoot.querySelector('#post-title').value;
        const author = this.shadowRoot.querySelector('#post-author').value;
        const content = this.shadowRoot.querySelector('#post-content').value;

        const newPost = {
            nombre: title,
            autor: author,
            contenido: content,
            fecha: new Date().toISOString().split('T')[0]
        };

        try {
            const response = await fetch('http://localhost:3000/api/blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add blog post');
            }

            const result = await response.json();
            console.log('Blog post added successfully:', result);
            alert('Blog post added successfully!');

            window.location.href = '/blog';

        } catch (error) {
            console.error('Error adding blog post:', error);
            alert(`Error adding blog post: ${error.message}`);
        }
    }

    handleCancel() {
        window.location.href = '/blog';
    }
}

customElements.define('add-blog-post-component', AddBlogPost);