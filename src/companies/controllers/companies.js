const Company = require('../models/Companies')

exports.addCompany = function (req, res) {
    var error = false;
    if (!req.body.organization_name) {
        res.status(500).send({ 'message': 'You must especify the Company id'})
        error = true
        return
    }
    if (!error) {
        let company = new Company(req.body)
        company.save()
            .then(data => {
                res.send({
                    message: 'Company successfully created', data: data
                });
            }).catch(err => {
                    res.status(500).send({
                        message: err.message || 'Some error occurred while creating the Company.'
                    })
            })
    }
}

exports.getCompany = function (req, res) {
    var error = false;
    var id = req.query.id;
    if (!id) {
        res.status(500).send({ 'message': 'You must specify a valid company id'
        })
        error = true
    } 
    if (!error) {
            Company.find({ id: id})
                .then(data => {
                    var message = '';
                    if (data === undefined || data.length == 0) message = 'No Company found!';
                    else message = 'Company successfully retrieved';
                    res.status(200).send({
                        'message': message, 'data': data
                    })
                }).catch(err => {
                    if (err.kind == 'ObjectId') {
                        res.status(404).send({ 'message': `There is no Company with id id`, 'error': err})
                        return
                    }
                    res.status(500).send({ 'message': `There was an error retrieving the Company with id id`})
                })
    }
}

exports.editCompany = function (req, res) {
    var error = false
    if (!req.query.id) {
        res.status(500).send({ 'message': 'You must specify the id of the Company' })
        error = true
        return
    }
    if (!error) {
        Company.findOneAndUpdate({ id: req.query.id}, req.body)
            .then(data => {
                if (data === undefined || data.length == 0) message = 'No Company found!';
                else message = 'Company successfully updated';
                res.status(200).send({ 'message': message })
            }).catch(err => {
                res.status(500).send({ 'error': err || "No Company found!"})
            })
    }
}

exports.deleteCompany = function (req, res) {
    var error = false
    if (!req.query.id) {
        res.status(500).send({ 'message': 'You must specify the id of the Company' })
        error = true
        return
    }
    if (!error) {
        Company.findOneAndDelete({ id: req.query.id })
            .then(data => {
                if (data === undefined || data.length == 0) message = 'No Company found!';
                else message = 'Company successfully deleted';
                res.status(200).send({ 'message': message })
            }).catch(err => {
                res.status(500).send({ 'error': err || 'There was a problem deleting the Company or the Company does not exist' })
            })
    }
}



