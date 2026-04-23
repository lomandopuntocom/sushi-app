export class Profile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <link rel="stylesheet" href="styles.css"> <div class="profile-container">
                <div class="left-section">
                    <img src="img/story.png" alt="Imagen representativa de perfil">
                    <div class="overlay-content">
                        <h1>PROFILE</h1>
                    </div>
                </div>
                <div class="right-section">
                    <div class="profile-header">
                        <h2>MY PROFILE</h2>
                    </div>

                    <div class="profile-details">
                        <div class="detail-row">
                            <span class="label">Name:</span>
                            <span class="value" id="profile-name">John Doe</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Email:</span>
                            <span class="value" id="profile-email">john.doe@example.com</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Phone:</span>
                            <span class="value" id="profile-phone">+1 555-1234</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Address:</span>
                            <span class="value" id="profile-address">123 Main St, Anytown, USA</span>
                        </div>
                        </div>

                    <div class="profile-actions">
                        <button class="edit-profile-button">Edit Profile</button>
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
        console.log('Profile component added to the DOM');
        const editButton = this.shadowRoot.querySelector('.edit-profile-button');
        if (editButton) {
            editButton.addEventListener('click', this.handleEditProfile.bind(this));
        }

        this.loadUserProfile();
    }

    disconnectedCallback() {
        console.log('Profile component removed from the DOM');
        const editButton = this.shadowRoot.querySelector('.edit-profile-button');
        if (editButton) {
            editButton.removeEventListener('click', this.handleEditProfile.bind(this));
        }
    }

    loadUserProfile() {
        setTimeout(() => {
            this.shadowRoot.getElementById('profile-name').textContent = 'Jane Smith';
            this.shadowRoot.getElementById('profile-email').textContent = 'jane.smith@example.com';
            this.shadowRoot.getElementById('profile-phone').textContent = '+44 20 7946 0870';
            this.shadowRoot.getElementById('profile-address').textContent = '456 Oak Ave, Otherville, UK';
        }, 500);
    }

    handleEditProfile() {
        alert('Edit Profile functionality to be implemented.');
    }
}

customElements.define('profile-component', Profile);