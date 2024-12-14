const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to Node.js with MongoDB!' });
});

module.exports = router;
