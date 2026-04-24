import authService from '../../services/authService.js';

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
                            <span class="value" id="profile-name"></span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Email:</span>
                            <span class="value" id="profile-email"></span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Phone:</span>
                            <span class="value" id="profile-phone"></span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Address:</span>
                            <span class="value" id="profile-address"></span>
                        </div>
                        </div>

                    <div class="profile-actions">
                        <button class="edit-profile-button">Edit Profile</button>
                    </div>

                    <div class="profile-actions">
                        <button id="close-profile-button" class="edit-profile-button">Close Profile</button>
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

    fetchUserProfile() {
        const user = authService.checkIfUserExist();
        if (user) {
            this.shadowRoot.getElementById('profile-name').textContent = user.nombre;
            this.shadowRoot.getElementById('profile-email').textContent = user.email;
            this.shadowRoot.getElementById('profile-phone').textContent = user.telefono;
            this.shadowRoot.getElementById('profile-address').textContent = user.direccion;
        }
    }

    connectedCallback() {
        console.log('Profile component added to the DOM');
        const editButton = this.shadowRoot.querySelector('.edit-profile-button');
        if (editButton) {
            editButton.addEventListener('click', this.handleEditProfile.bind(this));
        }

        const closeButton = this.shadowRoot.querySelector('#close-profile-button');
        if (closeButton) {
            closeButton.addEventListener('click', this.handleCloseProfile.bind(this));
        }

        this.fetchUserProfile();
    }

    disconnectedCallback() {
        console.log('Profile component removed from the DOM');
        const editButton = this.shadowRoot.querySelector('.edit-profile-button');
        if (editButton) {
            editButton.removeEventListener('click', this.handleEditProfile.bind(this));
        }

        const closeButton = this.shadowRoot.querySelector('#close-profile-button');
        if (closeButton) {
            closeButton.removeEventListener('click', this.handleCloseProfile.bind(this));
        }
    }

    handleCloseProfile() {
        authService.logout();
        window.location.href = '/';
    }

    handleEditProfile() {
        alert('Edit Profile functionality to be implemented.');
    }
}

customElements.define('profile-component', Profile);