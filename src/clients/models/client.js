const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)


const clientsSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    fullName: {
        type: String,
        default: function(){
            return this.firstName + this.lastName
        }
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    maxCredit: {
        type: Number,
        default: 0
    },
    totalPurchased: {
        type: Number
    },
    buysIn: {
        type: Number,
        required: true
    },
    company_owned_name: {
        type: String
    }
})

clientsSchema.plugin(AutoIncrement, { id: 'company_clients_seq', inc_field: 'id', reference_fields: ['buysIn'], collection_name: "company_clients_id_counter" })

module.exports = mongoose.model('company_clients', clientsSchema)