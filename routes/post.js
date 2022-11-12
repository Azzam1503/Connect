const express = require('express');
const router = express.Router();

const userPost = require('../controllers/post_controllter')

router.get('/post', userPost.post);

module.exports = router;