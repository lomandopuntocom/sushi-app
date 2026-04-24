export const Router = {
    init: () => {
        document.addEventListener("click", event => {
            const link = event.target.closest('a');
            console.log(link);
            if (link) {
                const href = link.getAttribute("href");
                console.log(href);
                if (href && href.startsWith("/")) {
                    event.preventDefault();
                    Router.go(href);
                }
            }
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
            case "/add-blog-post":
                pageElement = document.createElement("add-blog-post-component");
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
