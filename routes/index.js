const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')


console.log('Router is loaded');

router.get('/',homeController.home);
// router.get('/routename',homeController.actionName);

module.exports = router;