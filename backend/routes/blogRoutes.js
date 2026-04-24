const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.getPosts);
router.post('/', blogController.createPost);
router.post('/save', blogController.savePost);
router.get('/saved/:idusuario', blogController.getSavedPosts);

module.exports = router;