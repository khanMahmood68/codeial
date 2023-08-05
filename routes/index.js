const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')



console.log('Router is loaded');

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
// for further adding any routes
// router.use('./routesName',require(./userName))


module.exports = router;