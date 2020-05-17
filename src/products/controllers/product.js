const Product = require('../models/product')

exports.getProducts = function (req, res){
    var error = false;
    var id = req.query.id;
    var belong_to = req.query.belong_to;

    if(!belong_to){
        res.status(500).send({'message': 'You must specify a valid and organization id'})
        error = true
    } else if (id && !belong_to){
        res.status(500).send({'message': 'You must specify a valid product id and organization id'})
        error = true
    }
    if(!error){
        if(belong_to && !id){
            Product.find({belong_to: belong_to})
                .then(data => {
                    var message = '';
                    if (data === undefined || data.length == 0) message = 'No product found!';
                    else message = 'Products successfully retrieved';
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

        } else if(belong_to && id){
            Product.find({id: id, belong_to: belong_to})
                .then(data => {
                    var message = '';
                    if (data === undefined || data.length == 0) message = 'No product found!';
                    else message = 'Product successfully retrieved';
                    res.status(200).send({
                        'message': message,
                        'data': data
                    })
                }).catch(err => {
                        if(err.kind == 'ObjectId'){
                            res.status(404).send({'message': `There is no product with id ${id}`, 'error': err})
                            return
                        }
                        res.status(500).send({'message': `There was an error retrieving the product with id ${id}`})
                    })
        }
    }
}

exports.addProduct = function (req, res){
    var error = false
    if(!req.body.description || !req.body.belong_to){
        res.status(500).send({'message': 'You must especify the product id'})
        error = true
        return
    }
    if(!error){
        let product = new Product(req.body)
        product.save()
            .then(data => {
                res.send({
                    message: 'Product successfully created',
                    data: data
                });
            }).catch(err => {
                    res.status(500).send({
                        message: err.message || 'Some error occurred while creating the product.'
                    })
                })
    }
}

exports.editProduct = function (req, res){
    var error = false
    if(!req.query.id || !req.query.belong_to){
        res.status(500).send({'message': 'You must specify the id of the product and to whom the product belongs'})
        error =  true
        return
    }
    if(!error){
        Product.findOneAndUpdate({id: req.query.id, belong_to: req.query.belong_to}, req.body)
            .then(data => {
                if (data === undefined || data.length == 0) message = 'No product found!';
                else message = 'Product successfully updated';
                res.status(200).send({'message': message})
            }).catch( err =>{
                res.status(500).send({'error': err})
            })
    }
}

exports.deleteProduct = function (req, res){
    var error = false
    if (!req.query.id || !req.query.belong_to) {
        res.status(500).send({ 'message': 'You must specify the id of the product and to whom the product belongs' })
        error = true
        return
    }
    if (!error) {
        Product.findOneAndDelete({ id: req.query.id, belong_to: req.query.belong_to })
            .then(data => {
                if (data === undefined || data.length == 0) message = 'No product found!';
                else message = 'Product successfully deleted';
                res.status(200).send({ 'message': message })
            }).catch(err => {
                res.status(500).send({ 'error': err || 'There was a problem deleting the product or the product does not exist' })
            })
    }
}