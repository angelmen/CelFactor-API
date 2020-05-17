const express = require('express');
const router = express.Router();

// include invoice controller
const invoice_controller = require('../controllers/invoice');

// routes
router.get('/', invoice_controller.getInvoices);
router.post('/', invoice_controller.addInvoice);
router.put('/', invoice_controller.editInvoice);
router.delete('/', invoice_controller.deleteInvoice);

module.exports = router;