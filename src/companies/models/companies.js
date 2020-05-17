const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)


const CompanysSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    organization_name: {
        type: String,
        required: true
    },
    owner_id: {
        type: Number,
        required: true, 
        default: 0
    },
    location: {
        type: String,
        default: "n/a"
    },
    email: {
        type: String,
        default: "n/a"
    },
    phones: {
        type: Array,
        default: []
    },
    rnc: {
        type: String,
        default: "n/a"
    },
    waranty_policy: {
        type: String,
        default: "no definidas"
    },
    return_policy: {
        type: String,
        default: "no definidas"
    }
})

CompanysSchema.plugin(AutoIncrement, { id: 'companies_seq', inc_field: 'id', collection_name: "companies_id_counter"})

module.exports = mongoose.model('companies', CompanysSchema)