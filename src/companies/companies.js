/*const dbCon = require('../mysqlDBcon')
const express = require('express')
const router = express.Router()


router.get('/all/', function(req, res, next){
    var error = false
    var sql = 'SELECT * FROM company'
    console.log('here');
    
    if (!error) {
        dbCon.query(sql, function (err, rows, result) {
            //handle errors in SQL
            if (err) {
                res.status(500).send(err)
                console.log(err);
                return
            }
            //if no errors in SQL statement, verify if found some data
            if (rows.length <= 0) {
                res.status(404).json('error, company not found')
            }
            else {
                res.status(200).json(rows)
            }
        })
    }
})
router.post('/add', function (req, res, next) {
    error = false
    var company_data = { 
        organization_name: req.body.organization_name, 
        owner_id: req.body.owner_id, 
        location: req.body.location, 
        email: req.body.email, 
        phones: req.body.phones, 
        rnc: req.body.rnc, 
        waranty_policy: req.body.waranty_policy, 
        return_policy: req.body.return_policy
    }
    if (!company_data.organization_name || !company_data.owner_id){
            error = true
            res.send('You have to specify at least the organization name and the owner id')
    }
    
    if(!error){
        // insert query
        dbCon.query('INSERT INTO company SET ?', company_data, function (err, result) {
            //if(err) throw err
            if (err) {
                console.log(err)
                res.sendStatus(500)
                return
            } else {
                res.send('company added')
                return
            }
        })
    }
})

router.get('/(:id)', function (req, res, next){
    var error = false
    var sql = 'SELECT * FROM company WHERE id = ?'
    var id = req.params.id

    if (!id) {
        res.status(500).send({ 'error': 'you must include a valid company id' })
        error = true
    }

    if (!error) {
        dbCon.query(sql, [id], function (err, rows, result) {
            //handle errors in SQL
            if (err) {
                res.status(500).send(err)
                console.log(err);
                return
            }
            //if no errors in SQL statement, verify if found some data
            if (rows.length <= 0) {
                res.status(404).json('error, company not found with id of ' + id)
            }
            else {
                res.status(200).json(rows)
            }
        })
    }
})

router.put('/edit/:id', function(req, res, next){
    var error = false
    var sql = 'UPDATE company SET ? WHERE id = ?'

    if(!req.params.id){
        res.status(500).send({'error': 'you must include a valid company id'})
        error = true
    }

    if(!error){
        dbCon.query(sql, [req.body, req.params.id], function(err, result){
            if(err){
                res.status(500).send(err)
                console.log(err);
                return
            }
            if(!result.message.includes('Changes: 0')){
                res.status(200).send({'message': `Company information updated successfully to ${req.body}`, 'data': result})
            }else{
                res.status(404).send({'message': 'Company information not changed, because no changes to make where found'})
            }
        })
    }
})

router.delete('/delete/:id', function (req, res, next) {
    var error = false
    var sql = 'DELETE FROM company WHERE id = ?'
    var id = req.params.id
    
    if (!id) {
        res.status(500).send({ 'error': 'you must include a valid company id' })
        error = true
    }

    if (!error) {
        dbCon.query(sql, [id], function (err, result) {
            if (err) {
                res.status(500).send(err)
                console.log(err);
                return
            }
            if (result.affectedRows > 0) {
                res.status(200).send({ 'message': `Company deleted successfully`, 'data': result })
            } else {
                res.status(404).send({ 'message': `No company with id of ${id} found`})
            }
        })
    }
})

module.exports = router;*/