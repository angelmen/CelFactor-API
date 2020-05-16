const express = require('express');
const router = express.Router();

// include product controller
const product_controller = require('../controllers/product');

// routes
router.get('/', product_controller.getProducts);
router.post('/', product_controller.addProduct);
router.put('/', product_controller.editProduct);
router.delete('/', product_controller.deleteProduct);

module.exports = router;