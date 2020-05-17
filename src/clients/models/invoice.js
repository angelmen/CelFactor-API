const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)


const invoicesSchema = new mongoose.Schema({
    _id: {
        type: Number,
    },
    belong_to: {
        type: Number,
        required: [true, 'you need to specify to whom this product belongs to']
    },
    created: {
        type: Date,
        required: [true, 'created date is required'],
        default: Date.now
    },
    seller_name: {
        type: String,
        required: [true, 'seller fullname required']
    },
    client_name: {
        type: String,
        default: 'cliente contado'
    },
    client_company_name: {
        type: String,
        default: 'n/a'
    },
    products: {
       type: Array
    },
    company_information: {
        type: Array,
    },
    total_to_pay: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    payment_method: {
        type: Array,
        default: ['cash']
    }
}, { _id: false })

invoicesSchema.plugin(AutoIncrement)

module.exports = mongoose.model('company_invoices', invoicesSchema)