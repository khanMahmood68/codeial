const express = require('express');
const router = express.Router();
const profileController = require('../controllers/users_controller')

console.log('this is working');

router.get('/profile',profileController.profile);

router.get('/sign-up',profileController.signUp);
router.get('/sign-in',profileController.signIn);
router.post('/create',profileController.create);

module.exports=router;
