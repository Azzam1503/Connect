const express = require('express');
const router = express.Router();
const passport = require('passport');
const userPost = require('../controllers/post_controllter')

router.get('/post', passport.checkAuthentication, userPost.post);

module.exports = router;