// pages/menu/menu.js (ACTUALIZADO)
import { menuData } from '../../mockdata/platos.js'; // Importa los datos del menú

export class menu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.menuData = menuData;

        const template = document.createElement('template');
        template.innerHTML = `
            <link rel="stylesheet" href="./styles.css">
            <div class="menu-container">
                <div class="menu-image-section" style="background-image: url(img/menu.png);">
                    <div class="image-overlay">
                        <h3 id="menu-title">MENU</h3>
                        <p id="dish-description" class="menu-description-text"></p>
                    </div>
                </div>
                <div class="menu-list-section">
                    <ul class="menu-filter-list"></ul>
                    <div id="dish-list-container"></div>
                </div>
            </div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.menuFilterList = this.shadowRoot.querySelector('.menu-filter-list');
        this.dishListContainer = this.shadowRoot.querySelector('#dish-list-container');
        this.menuImageSection = this.shadowRoot.querySelector('.menu-image-section');
        this.menuTitleElement = this.shadowRoot.querySelector('#menu-title');
        this.dishDescriptionElement = this.shadowRoot.querySelector('#dish-description');

        this.dishDescriptionElement.textContent = '';
        this.dishDescriptionElement.style.opacity = '0';

        this.renderCategories();
        this.renderDishes('all');
    }

    renderCategories() {
        this.menuFilterList.innerHTML = '';
        const allCategory = this.menuData.categorias.find(cat => cat.id === 'all');
        if (allCategory) {
            const listItem = document.createElement('li');
            listItem.classList.add('menu-filter-card', 'active');
            listItem.textContent = allCategory.nombre;
            listItem.dataset.categoryId = allCategory.id;
            listItem.addEventListener('click', () => this.filterDishesByCategory(allCategory.id, allCategory.nombre));
            this.menuFilterList.appendChild(listItem);
        }

        this.menuData.categorias.filter(cat => cat.id !== 'all').forEach(category => {
            const listItem = document.createElement('li');
            listItem.classList.add('menu-filter-card');
            listItem.textContent = category.nombre;
            listItem.dataset.categoryId = category.id;
            listItem.addEventListener('click', () => this.filterDishesByCategory(category.id, category.nombre));
            this.menuFilterList.appendChild(listItem);
        });
    }

    renderDishes(categoryId) {
        this.dishListContainer.innerHTML = '';

        this.menuTitleElement.textContent = 'MENU';
        this.dishDescriptionElement.textContent = '';
        this.dishDescriptionElement.style.opacity = '0';
        this.menuImageSection.style.backgroundImage = 'url(img/menu.png)'; // Corrected to use 'menu.png' from the template

        if (categoryId === 'all') {
            const actualCategories = this.menuData.categorias.filter(cat => cat.id !== 'all');
            actualCategories.forEach(category => {
                const categoryDishes = this.menuData.platillos.filter(dish => dish.idCategoria === category.id);

                if (categoryDishes.length > 0) {
                    const categoryTitle = document.createElement('h1');
                    categoryTitle.classList.add('menu-list-category');
                    categoryTitle.textContent = category.nombre;
                    this.dishListContainer.appendChild(categoryTitle);

                    const dishList = document.createElement('ul');
                    dishList.classList.add('menu-list');

                    categoryDishes.forEach(dish => {
                        dishList.appendChild(this.createDishCard(dish));
                    });
                    this.dishListContainer.appendChild(dishList);
                }
            });
        } else {
            const selectedCategory = this.menuData.categorias.find(cat => cat.id === categoryId);
            const categoryDishes = this.menuData.platillos.filter(dish => dish.idCategoria === categoryId);

            if (selectedCategory && categoryDishes.length > 0) {
                const dishList = document.createElement('ul');
                dishList.classList.add('menu-list');

                categoryDishes.forEach(dish => {
                    dishList.appendChild(this.createDishCard(dish));
                });
                this.dishListContainer.appendChild(dishList);
            } else {
                const noDishesMessage = document.createElement('p');
                noDishesMessage.textContent = `No dishes found for ${selectedCategory ? selectedCategory.nombre : ''}.`;
                this.dishListContainer.appendChild(noDishesMessage);
            }
        }
    }

    createDishCard(dish) {
        const listItem = document.createElement('li');
        listItem.classList.add('menu-card-body');
        listItem.innerHTML = `
            <div class="menu-card-thumbnail" style="background-image: url('${dish.imagen}')"></div>
            <div class="menu-card-info">
                <div class="menu-card-info-header">
                    <h2>${dish.nombre}</h2>
                    <h2 class="menu-card-price">$${dish.precio.toFixed(2)}</h2>
                </div>
                <div class="menu-card-info-body">
                    ${dish.descripcion}
                </div>
                <div class="menu-card-actions">
                    <button class="add-to-cart-button" data-dish-id="${dish.id}">Add to Cart</button>
                </div>
            </div>
        `;

        const addToCartButton = listItem.querySelector('.add-to-cart-button');
        addToCartButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent listItem's click event from firing
            this.handleAddToCart(dish);
        });

        listItem.addEventListener('click', () => {
            this.menuImageSection.style.backgroundImage = `url('${dish.imagen}')`;
            this.menuTitleElement.textContent = dish.nombre;
            this.dishDescriptionElement.textContent = dish.descripcion;
            this.dishDescriptionElement.style.opacity = '1';
        });
        return listItem;
    }

    filterDishesByCategory(categoryId, categoryName) {
        this.shadowRoot.querySelectorAll('.menu-filter-card').forEach(card => {
            card.classList.remove('active');
        });

        const clickedCard = this.shadowRoot.querySelector(`[data-category-id="${categoryId}"]`);
        if (clickedCard) {
            clickedCard.classList.add('active');
        }

        this.renderDishes(categoryId);
    }

    handleAddToCart(dish) {
        console.log(`Adding ${dish.nombre} (ID: ${dish.id}, Price: $${dish.precio.toFixed(2)}) to cart.`);
        // Emitir un evento personalizado para que el componente del carrito lo capture
        this.dispatchEvent(new CustomEvent('add-to-cart', {
            detail: { dish: dish },
            bubbles: true,   // El evento "burbujea" y puede ser escuchado por padres
            composed: true   // El evento puede atravesar los límites del Shadow DOM
        }));
        // alert(`${dish.nombre} added to cart!`); // Feedback al usuario - Considerar algo menos intrusivo en una app real
    }

    connectedCallback() {
        console.log('Menu component added to the DOM');
    }

    disconnectedCallback() {
        console.log('Menu component removed from the DOM');
        // No necesitamos limpiar listeners creados en createDishCard porque listItem y sus hijos
        // son eliminados del DOM cuando renderDishes limpia dishListContainer.
        // Los listeners en menuFilterList se crean una vez y se limpian si el componente entero se remueve.
    }
}

customElements.define('menu-component', menu);
