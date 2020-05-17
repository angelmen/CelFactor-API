const express = require('express');
const router = express.Router();

// include users controller
const users_controller = require('../controllers/users');

// routes
router.get('/', users_controller.getUser);
router.post('/', users_controller.addUser);
router.put('/', users_controller.editUser);
router.delete('/', users_controller.deleteUser);

module.exports = router;