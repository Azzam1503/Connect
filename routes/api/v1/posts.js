const express = require('express');
const router = express.Router();
const postApi  = require('../../../controllers/api/v1/post_api')
const passport = require('passport');

router.use('/', postApi.index);
router.delete('/:id', passport.authenticate('jwt', {session: false}), postApi.destroy);

module.exports = router;