const Client = require('../models/client')

exports.getClient = function (req, res) {
    var error = false;
    var id = req.query.id;
    var buysIn = req.query.buysIn;

    if (!buysIn) {
        res.status(500).send({ 'message': 'You must specify a valid organization id' })
        error = true
    } else if (id && !buysIn) {
        res.status(500).send({ 'message': 'You must specify a valid client id and organization id' })
        error = true
    }
    if (!error) {
        if (belong_to && !id) {
            Client.find({ buysIn: buysIn })
                .then(data => {
                    var message = '';
                    if (data === undefined || data.length == 0) message = 'No Client found!';
                    else message = 'Client successfully retrieved';

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
        } else if (buysIn && id) {
            Client.find({ id: id })
                .then(data => {
                    var message = '';
                    if (data === undefined || data.length == 0) message = 'No Client found!';
                    else message = 'Client successfully retrieved';
                    res.status(200).send({
                        'message': message,
                        'data': data
                    })
                }).catch(err => {
                    if (err.kind == 'ObjectId') {
                        res.status(404).send({ 'message': `There is no client with id ${id}`, 'error': err })
                        return
                    }
                    res.status(500).send({ 'message': `There was an error retrieving the Client with id ${id}` })
                })
        }
    }
}

exports.addClient = function (req, res) {
    let client = new Client(req.body)
    client.save()
        .then(data => {
            res.send({
                message: 'Client successfully created',
                data: data
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Client.'
            })
        })
}

exports.editClient = function (req, res) {
    var error = false
    if (!req.query.id || !req.query.buysIn) {
        res.status(500).send({ 'message': 'You must specify the id of the client and where the client buys in' })
        error = true
        return
    }
    if (!error) {
        Client.findOneAndUpdate({ id: req.query.id, buysIn: req.query.buysIn }, req.body)
            .then(data => {
                if (data === undefined || data.length == 0) message = 'No Client found!';
                else message = 'Client successfully updated';
                res.status(200).send({ 'message': message })
            }).catch(err => {
                res.status(500).send({ 'error': err })
            })
    }
}

exports.deleteClient = function (req, res) {
    var error = false
    if (!req.query.id || !req.query.buysIn) {
        res.status(500).send({ 'message': 'You must specify the id of the Client and where the Client buys in' })
        error = true
        return
    }
    if (!error) {
        Client.findOneAndDelete({ id: req.query.id, buysIn: req.query.buysIn })
            .then(data => {
                if (data === undefined || data.length == 0) message = 'No Client found!';
                else message = 'Client successfully deleted';
                res.status(200).send({ 'message': message })
            }).catch(err => {
                res.status(500).send({ 'error': err || 'There was a problem deleting the Client or the Client does not exist' })
            })
    }
}