// pages
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
import { AddBlogPost } from './pages/addBlogPost/addBlogPost.js';

// services
import { Router } from './services/router.js';




document.addEventListener('DOMContentLoaded', () => {
    Router.init();
});