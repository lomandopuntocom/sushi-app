const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.getPosts);
router.post('/', blogController.createPost);

module.exports = router;