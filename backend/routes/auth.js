const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

router.get('/test', (req, res) => {
    res.send('✅ Auth route is connected!');
  });

module.exports = router;