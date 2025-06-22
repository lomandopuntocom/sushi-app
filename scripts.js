import { Navbar } from './pages/navbar/Navbar.js';
import { frontPage } from './pages/frontpage/frontpage.js';
import { menu } from './pages/menu/menu.js';

export const Router = {
    init: () => {
        // Initialize navigation button event listeners
        document.querySelectorAll("a.nav_button").forEach((a) => {
            a.addEventListener("click", (event) => {
                event.preventDefault();
                const href = event.target.getAttribute("href");
                Router.go(href);
            });
        });

        // Handle browser's back/forward buttons
        window.addEventListener("popstate", () => {
            Router.go(location.pathname, false);
        });

        // Initial route handling when the page loads
        Router.go(location.pathname, false);
    },

    go: (route, addToHistory = true) => {
        if (addToHistory) {
            history.pushState({ route }, '', route);
        }

        let pageElement = null;
        const main = document.getElementById('main'); // Use 'main' as consistent container ID

        // Clear existing content in 'main' before adding new page
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }

        switch (route) {
            case "/menu": // Default route for the front page
                pageElement = document.createElement("frontpage-component");
                break;
            case "/": // Example route for the menu page
                pageElement = document.createElement("menu-component");
                break;
            default:
                // Fallback for unknown routes, maybe a 404 page or redirect to home
                pageElement = document.createElement("menu-component"); // Default to front page
                console.warn(`Route not found: ${route}. Displaying front page.`);
                break;
        }

        if (pageElement) {
            main.appendChild(pageElement);
        }

        window.scrollTo(0, 0); // Scroll to top on route change
    },
};

// Ensure the DOM is fully loaded before initializing the router
document.addEventListener('DOMContentLoaded', () => {
    // Register custom elements if they haven't been already.
    // This is a good place to do it if you're not using a build step that handles it.
    // For example:
    // customElements.define('frontpage-component', frontPage);
    // customElements.define('menu-component', menu);
    // customElements.define('navbar-component', Navbar); // If Navbar is also a custom element

    Router.init(); // Initialize the router
});