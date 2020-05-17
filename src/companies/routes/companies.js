const express = require('express');
const router = express.Router();

// include Company controller
const Company_controller = require('../controllers/companies');

// routes
router.get('/', Company_controller.getCompany);
router.post('/', Company_controller.addCompany);
router.put('/', Company_controller.editCompany);
router.delete('/', Company_controller.deleteCompany);

module.exports = router;