const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Sample Title', message: 'Sample message'})
});

module.exports = router;