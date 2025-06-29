export class Registration extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <link rel="stylesheet" href="styles.css">
            <style>
                /* Add some basic styling for validation feedback */
                .form-group input:focus:invalid {
                    border-color: red;
                }
                .form-group input:focus:valid {
                    border-color: green;
                }
                .error-message {
                    color: red;
                    font-size: 0.8em;
                    margin-top: 5px;
                    display: none; /* Hidden by default */
                }
                .form-group.invalid .error-message {
                    display: block;
                }
                .form-group.invalid input {
                    border-color: red;
                }
            </style>
            <div class="registration-container">
                <div class="left-section">
                    <img src="img/registration-main.png" alt="Copas de vino en una mesa de restaurante">
                    <div class="overlay-content">
                        <h1>REGISTRATION</h1>
                    </div>
                </div>
                <div class="right-section">
                    <div class="registration-form-header">
                        <h2>REGISTRATION</h2>
                    </div>

                    <form class="registration-form" novalidate> <div class="form-group">
                            <input type="text" id="name" name="name" placeholder="Name" required aria-label="Name">
                            <div class="error-message" id="name-error">Name is required.</div>
                        </div>
                        <div class="form-group">
                            <input type="tel" id="phone" name="phone" placeholder="Phone Number" required pattern="[0-9]{10}" aria-label="Phone Number">
                            <div class="error-message" id="phone-error">Please enter a valid 10-digit phone number.</div>
                        </div>
                        <div class="form-group">
                            <input type="email" id="email" name="email" placeholder="Email" required aria-label="Email">
                            <div class="error-message" id="email-error">Please enter a valid email address.</div>
                        </div>
                        <div class="form-group">
                            <input type="password" id="password" name="password" placeholder="Password" required minlength="8" aria-label="Password">
                            <div class="error-message" id="password-error">Password must be at least 8 characters long.</div>
                        </div>
                        <div class="form-group">
                            <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm Password" required aria-label="Confirm Password">
                            <div class="error-message" id="confirm-password-error">Passwords do not match.</div>
                        </div>
                        <div class="form-group">
                            <input type="text" id="address" name="address" placeholder="Address" aria-label="Address">
                        </div>
                        <button type="submit" class="register-button">REGISTER</button>
                        <a href="#/login" class="login-link">Go to login instead</a>
                    </form>

                    <div class="footer-links">
                        <a href="#">Licensing</a>
                        <a href="#">Styleguide</a>
                    </div>
                </div>
            </div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.form = this.shadowRoot.querySelector('.registration-form');
    }

    connectedCallback() {
        console.log('Registration component added to the DOM');
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.form.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', this.validateInput.bind(this));
            input.addEventListener('blur', this.validateInput.bind(this)); // Validate on blur as well
        });
    }

    disconnectedCallback() {
        console.log('Registration component removed from the DOM');
        if (this.form) {
            this.form.removeEventListener('submit', this.handleSubmit.bind(this));
            this.form.querySelectorAll('input').forEach(input => {
                input.removeEventListener('input', this.validateInput.bind(this));
                input.removeEventListener('blur', this.validateInput.bind(this));
            });
        }
    }

    validateInput(event) {
        const input = event.target;
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');

        if (input.validity.valid) {
            formGroup.classList.remove('invalid');
            if (errorMessage) errorMessage.style.display = 'none';
        } else {
            formGroup.classList.add('invalid');
            if (errorMessage) {
                errorMessage.style.display = 'block';
                if (input.id === 'phone' && input.validity.patternMismatch) {
                    errorMessage.textContent = 'Please enter a valid 10-digit phone number.';
                } else if (input.id === 'email' && input.validity.typeMismatch) {
                    errorMessage.textContent = 'Please enter a valid email address.';
                } else if (input.id === 'password' && input.validity.tooShort) {
                    errorMessage.textContent = `Password must be at least ${input.minLength} characters long.`;
                } else {
                    errorMessage.textContent = input.validationMessage || `${input.placeholder} is required.`;
                }
            }
        }

        if (input.id === 'confirm-password' || input.id === 'password') {
            const password = this.shadowRoot.getElementById('password').value;
            const confirmPassword = this.shadowRoot.getElementById('confirm-password').value;
            const confirmPasswordError = this.shadowRoot.getElementById('confirm-password-error');

            if (password !== confirmPassword && confirmPassword.length > 0) {
                this.shadowRoot.getElementById('confirm-password').closest('.form-group').classList.add('invalid');
                confirmPasswordError.textContent = 'Passwords do not match.';
                confirmPasswordError.style.display = 'block';
            } else if (password === confirmPassword && confirmPassword.length > 0) {
                 this.shadowRoot.getElementById('confirm-password').closest('.form-group').classList.remove('invalid');
                 confirmPasswordError.style.display = 'none';
            }
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        let formIsValid = true;
        this.form.querySelectorAll('input').forEach(input => {
            if (!input.checkValidity()) {
                formIsValid = false;
                this.validateInput({ target: input });
            }
        });

        const password = this.shadowRoot.getElementById('password').value;
        const confirmPassword = this.shadowRoot.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            formIsValid = false;
            this.shadowRoot.getElementById('confirm-password').closest('.form-group').classList.add('invalid');
            this.shadowRoot.getElementById('confirm-password-error').textContent = 'Passwords do not match.';
            this.shadowRoot.getElementById('confirm-password-error').style.display = 'block';
        }

        if (!formIsValid) {
            alert('Please correct the errors in the form.');
            return;
        }

        const name = this.shadowRoot.getElementById('name').value;
        const phone = this.shadowRoot.getElementById('phone').value;
        const email = this.shadowRoot.getElementById('email').value;
        const address = this.shadowRoot.getElementById('address').value;

        console.log('Formulario de registro enviado:', {
            name, phone, email, password, address
        });

        // Simulate API call
        this.simulateRegistration({ name, phone, email, password, address })
            .then(response => {
                alert('Registration successful!');
                // Potentially redirect or show a success message
                this.form.reset(); // Clear the form after successful submission
            })
            .catch(error => {
                alert(`Registration failed: ${error.message}`);
                // Handle specific error messages from the backend
            });
    }

    // --- New functionality ---

    /**
     * Simulates an asynchronous API call for registration.
     * In a real application, this would be an actual fetch() request to your backend.
     * @param {object} userData - The data to be registered.
     * @returns {Promise<object>} - A promise that resolves with a success message or rejects with an error.
     */
    simulateRegistration(userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const randomSuccess = Math.random() > 0.2; // 80% chance of success
                if (randomSuccess) {
                    console.log('Simulated backend success:', userData);
                    resolve({ message: 'User registered successfully!' });
                } else {
                    console.error('Simulated backend error: Email already exists.');
                    reject(new Error('Email already exists.'));
                }
            }, 1500); // Simulate network delay
        });
    }
}

customElements.define('registration-component', Registration);