// login.js
export class Login extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <link rel="stylesheet" href="styles.css"> <div class="login-container">
                <div class="left-section">
                    <img src="img/login-main.png" alt="Copas de vino en una mesa de restaurante">
                    <div class="overlay-content">
                        <h1>LOGIN</h1>
                    </div>
                </div>
                <div class="right-section">
                    <div class="login-form-header">
                        <h2>LOGIN</h2>
                    </div>

                    <form class="login-form">
                        <div class="form-group">
                            <input type="email" id="email" name="email" placeholder="Email" required>
                        </div>
                        <div class="form-group">
                            <input type="password" id="password" name="password" placeholder="Password" required>
                        </div>
                        <button type="submit" class="login-button">LOGIN</button>
                        <a href="#/registration" class="registration-link">Go to registration instead</a>
                    </form>

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
        console.log('Login component added to the DOM');
        const form = this.shadowRoot.querySelector('.login-form');
        form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    disconnectedCallback() {
        console.log('Login component removed from the DOM');
        const form = this.shadowRoot.querySelector('.login-form');
        if (form) {
            form.removeEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    async handleSubmit(event) {
        event.preventDefault();

        const email = this.shadowRoot.getElementById('email').value;
        const password = this.shadowRoot.getElementById('password').value;

        const credentials = {
            "email": email,
            "contrasena": password
        }

        try{
            const response = await fetch('http://localhost:3000/api/session/login',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            })

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to login')
            }

            const result = await response.json();
            delete result.user.contrasena;
            localStorage.setItem('Sushi-user', JSON.stringify(result.user));
            console.log('Login succesful', result.message);
            alert('Succesful Login');
            window.location.href = '/';
        }
        catch (error){
            console.error('Error during login:', error);
            alert(`Error to login: ${error.message}`);
        }
    }
}

customElements.define('login-component', Login);