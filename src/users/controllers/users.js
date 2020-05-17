const User = require('../models/users')

exports.getUser = function (req, res) {
    var error = false;
    var id = req.query.id;
    var works_for = req.query.works_for;

    if (!works_for) {
        res.status(500).send({ 'message': 'You must specify a valid organization id' })
        error = true
    } else if (id && !works_for) {
        res.status(500).send({ 'message': 'You must specify a valid users id and organization id' })
        error = true
    }
    if (!error) {
        if (works_for && !id) {
            User.find({ works_for: works_for })
                .then(data => {
                    var message = '';
                    if (data === undefined || data.length == 0) message = 'No users found!';
                    else message = 'users successfully retrieved';

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
        } else if (works_for && id) {
            User.find({ id: id, works_for: works_for})
                .then(data => {
                    var message = '';
                    if (data === undefined || data.length == 0) message = 'No User found!';
                    else message = 'User successfully retrieved';
                    res.status(200).send({
                        'message': message,
                        'data': data
                    })
                }).catch(err => {
                    if (err.kind == 'ObjectId') {
                        res.status(404).send({ 'message': `There is no users with id ${id}`, 'error': err })
                        return
                    }
                    res.status(500).send({ 'message': `There was an error retrieving the User with id ${id}` })
                })
        }
    }
}

exports.addUser = function (req, res) {
    var error = false
    if (!req.body.username || !req.body.firstName || !req.body.lastName || !req.body.password || !req.body.email || !req.body.works_for || !req.body.owned_company_id) {
        res.status(500).send({ 'message': 'data is not complete' })
        error = true
        return
    }
    if (!error) {
        let users = new User(req.body)
        users.save()
            .then(data => {
                res.send({
                    message: 'User successfully created',
                    data: data
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while creating the User.'
                })
            })
    }
}

exports.editUser = function (req, res) {
    var error = false
    if (!req.query.id || !req.query.belong_to) {
        res.status(500).send({ 'message': 'You must specify the id of the users and to whom the users belongs' })
        error = true
        return
    }
    if (!error) {
        User.findOneAndUpdate({ _id: req.query.id, belong_to: req.query.belong_to }, req.body)
            .then(data => {
                if (data === undefined || data.length == 0) message = 'No User found!';
                else message = 'User successfully updated';
                res.status(200).send({ 'message': message })
            }).catch(err => {
                res.status(500).send({ 'error': err })
            })
    }
}

exports.deleteUser = function (req, res) {
    var error = false
    if (!req.query.id || !req.query.belong_to) {
        res.status(500).send({ 'message': 'You must specify the id of the User and to whom the User belongs' })
        error = true
        return
    }
    if (!error) {
        User.findOneAndDelete({ _id: req.query.id, belong_to: req.query.belong_to })
            .then(data => {
                if (data === undefined || data.length == 0) message = 'No User found!';
                else message = 'User successfully deleted';
                res.status(200).send({ 'message': message })
            }).catch(err => {
                res.status(500).send({ 'error': err || 'There was a problem deleting the User or the User does not exist' })
            })
    }
}