const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)
const usersSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    firstName: {
        type: String
        ,required: true
    },
    lastName: {
        type: String
        , required: true
    },
    username: {
        type: String
        , required: true
    },
    password: {
        type: String
        , required: true
    },
    email: {
        type: String
        , required: true
    },
    works_for: {
        type: Number,
    },
    type: {
        type: String,
        enum: ["owner", "seller"],
        default: "seller"
    },
    owned_company_id: {
        type: Number,
    },
    active: {
        type: Boolean,
        default: true
    }    
})
usersSchema.plugin(AutoIncrement, { id: 'users_seq', inc_field: 'id', reference_fields: ['works_for'], collection_name: "company_users_id_counter" });


module.exports = mongoose.model('company_users', usersSchema)