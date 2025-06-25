import { Navbar } from './pages/navbar/Navbar.js';
import { frontPage } from './pages/frontpage/frontpage.js';
import { menu } from './pages/menu/menu.js';
import { About } from './pages/about/about.js';
import { Contact } from './pages/contact/contact.js';
import { Blog } from './pages/blog/blog.js';
import { BlogPost } from './pages/blog-post/blog-post.js';
import { Reservation } from './pages/reservation/reservation.js';
import { Cart } from './pages/cart/cart.js';
import { Registration } from './pages/registration/registration.js';
import { Login } from './pages/login/login.js';
import { Profile } from './pages/profile/profile.js';

export const Router = {
    init: () => {
        document.querySelectorAll("a.nav_button").forEach((a) => {
            a.addEventListener("click", (event) => {
                event.preventDefault();
                const href = event.target.getAttribute("href");
                Router.go(href);
            });
        });

        window.addEventListener("popstate", () => {
            Router.go(location.pathname, false);
        });

        Router.go(location.pathname, false);
    },

    go: (route, addToHistory = true) => {
        if (addToHistory) {
            history.pushState({ route }, '', route);
        }

        let pageElement = null;
        const main = document.getElementById('main');

        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }

        switch (route) {
            case "/":
                pageElement = document.createElement("frontpage-component");
                break;
            case "/menu":
                pageElement = document.createElement("menu-component");
                break;
            case "/contact":
                pageElement = document.createElement("contact-component");
                break;
            case "/about":
                pageElement = document.createElement("about-component");
                break;
            case "/blog":
                pageElement = document.createElement("blog-component");
                break;
            case "/blog-post":
                pageElement = document.createElement("blog-post-component");
                break;
            case "/reservation":
                pageElement = document.createElement("reservation-component");
                break;
            case "/cart":
                pageElement = document.createElement("cart-component");
                break;
            case "/registration":
                pageElement = document.createElement("registration-component");
                break;
            case "/login": 
                pageElement = document.createElement("login-component");
                break;
            case "/profile": 
                pageElement = document.createElement("profile-component");
                break;
            default:
                pageElement = document.createElement("menu-component");
                console.warn(`Route not found: ${route}. Displaying front page.`);
                break;
        }

        if (pageElement) {
            main.appendChild(pageElement);
        }

        window.scrollTo(0, 0);
    },
};

document.addEventListener('DOMContentLoaded', () => {
    Router.init();
});