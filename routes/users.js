const express = require('express');
const router = express.Router();
const passport = require('passport');
const profileController = require('../controllers/users_controller')

console.log('this is working');

router.get('/profile',passport.checkAuthentication,profileController.profile);

router.get('/sign-up',profileController.signUp);
router.get('/sign-in',profileController.signIn);

router.post('/create',profileController.create);

// use possport as a middleware to authenticate
router.post('/create-session',
passport.authenticate('local',
    {failureRedirect:'/users/sign-in'}
),
profileController.createSession)

router.get('/sign-out',profileController.destroySession)

module.exports=router;
