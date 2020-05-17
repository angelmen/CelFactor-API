const express = require('express');
const router = express.Router();

// include client controller
const client_controller = require('../controllers/client');

// routes
router.get('/', client_controller.getClient);
router.post('/', client_controller.addClient);
router.put('/', client_controller.editClient);
router.delete('/', client_controller.deleteClient);

module.exports = router;