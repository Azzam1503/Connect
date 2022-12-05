const expres = require('express');
const router = expres.Router();

router.use('/posts', require('./posts'));

module.exports = router;
