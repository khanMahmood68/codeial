const express = require('express');
const router = express.Router();
const aboutController =require ('../controllers/posts_Controller');

console.log('this is running');

router.get('/post',aboutController.post)

module.exports = router;