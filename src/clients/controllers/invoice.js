const Invoice = require('../models/invoice')

exports.getInvoices = function (req, res) {
    var error = false;
    var id = req.query.id;
    var belong_to = req.query.belong_to;

    if (!belong_to) {
        res.status(500).send({ 'message': 'You must specify a valid and organization id' })
        error = true
    } else if (id && !belong_to) {
        res.status(500).send({ 'message': 'You must specify a valid invoice id and organization id' })
        error = true
    }
    if (!error) {
        if (belong_to && !id) {
            Invoice.find({ belong_to: belong_to })
                .then(data => {
                    var message = '';
                    if (data === undefined || data.length == 0) message = 'No Invoices found!';
                    else message = 'Invoices successfully retrieved';

                    res.status(200).send({
                        'message': message,
                        'data': data
                    })

                }).catch(err => {
                    res.status(500).send({
                        'message': 'There was an error retreiving the data.',
                        'error': err.message
                    })
                })
        } else if (belong_to && id) {
            Invoice.find({ _id: id })
                .then(data => {
                    var message = '';
                    if (data === undefined || data.length == 0) message = 'No Invoice found!';
                    else message = 'Invoice successfully retrieved';
                    res.status(200).send({
                        'message': message,
                        'data': data
                    })
                }).catch(err => {
                    if (err.kind == 'ObjectId') {
                        res.status(404).send({ 'message': `There is no invoice with id ${id}`, 'error': err })
                        return
                    }
                    res.status(500).send({ 'message': `There was an error retrieving the Invoice with id ${id}` })
                })
        }
    }
}

exports.addInvoice = function (req, res) {
    var error = false
    if (!req.body.description || !req.body.belong_to) {
        res.status(500).send({ 'message': 'You must especify the Invoice id' })
        error = true
        return
    }
    if (!error) {
        let invoice = new Invoice(req.body)
        invoice.save()
            .then(data => {
                res.send({
                    message: 'Invoice successfully created',
                    data: data
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while creating the Invoice.'
                })
            })
    }
}

exports.editInvoice = function (req, res) {
    var error = false
    if (!req.query.id || !req.query.belong_to) {
        res.status(500).send({ 'message': 'You must specify the id of the invoice and to whom the invoice belongs' })
        error = true
        return
    }
    if (!error) {
        Invoice.findOneAndUpdate({ _id: req.query.id, belong_to: req.query.belong_to }, req.body)
            .then(data => {
                if (data === undefined || data.length == 0) message = 'No Invoice found!';
                else message = 'Invoice successfully updated';
                res.status(200).send({ 'message': message })
            }).catch(err => {
                res.status(500).send({ 'error': err })
            })
    }
}

exports.deleteInvoice = function (req, res) {
    var error = false
    if (!req.query.id || !req.query.belong_to) {
        res.status(500).send({ 'message': 'You must specify the id of the Invoice and to whom the Invoice belongs' })
        error = true
        return
    }
    if (!error) {
        Invoice.findOneAndDelete({ _id: req.query.id, belong_to: req.query.belong_to })
            .then(data => {
                if (data === undefined || data.length == 0) message = 'No Invoice found!';
                else message = 'Invoice successfully deleted';
                res.status(200).send({ 'message': message })
            }).catch(err => {
                res.status(500).send({ 'error': err || 'There was a problem deleting the Invoice or the Invoice does not exist' })
            })
    }
}