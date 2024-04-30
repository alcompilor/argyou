const express = require('express');
const router = express.Router();
const { signIn } = require('backend\controllers\signInHandler.js'); 

router.post('/signin', signIn);

module.exports = router;
