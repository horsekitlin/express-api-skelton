const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.json({ title: 'home', user: req.user });
});

module.exports = router;
