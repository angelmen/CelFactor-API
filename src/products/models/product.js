const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)

const productsSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    description: {
        type : String,
        required :[true, 'description is required']
    },
    belong_to: {
        type : Number,
        required :[true, 'you need to specify to whom this product belongs to']
    },
    min_stock: {
        type : Number,
        default: 0
    },
    stock: {
        type : Number,
        default: 1
    },
    cost: {
        type : Number,
        default: 0
    },
    min_price: {
        type :Number,
        default: this.unit_price
    },
    unit_price: {
        type : Number,
        required : [true, 'unit_price is required']
    },
    taxes: {
        type : Array,
        default: ['n/a']
    },
    created: {
        type : Date,
        required: [true, 'created date is required'], 
        default: Date.now
    }
})

productsSchema.plugin(AutoIncrement, { id: 'company_products_seq', inc_field: 'id', reference_fields: ['belong_to'], collection_name: "company_products_id_counter"})

module.exports = mongoose.model('company_products', productsSchema)