const express = require('express');
const router = express.Router()
const { signup, signin} = require('../auth.controller');

router.post("/register", signup, (req, res) => {});
router.post("/login", signin, (req, res) => {});

module.exports = router;