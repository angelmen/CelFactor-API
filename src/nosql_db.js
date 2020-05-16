const mongoose = require('mongoose');
const productsSchema = require('./products/productsSchema')
const Product = mongoose.model('Product', productsSchema, 'Products')

async function createProduct(id, description, belong_to, min_stock, stock, cost, min_price, usual_price, taxes) {
    return new Product({
        id,
        description,
        belong_to,
        min_stock,
        stock,
        cost,
        min_price,
        usual_price,
        taxes
    }).save()
}

async function findProduct(description){
    return await Product.find(description)
}

