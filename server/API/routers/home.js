const express = require('express');

const { homecontroller } = require('../controller/home');

const router = express.Router();

router.route('/').get(homecontroller);

module.exports = router;