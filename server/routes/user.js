const router = require('express').Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Protected route
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

module.exports = router;