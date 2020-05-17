const express = require('express')
const dbCon = require('../mysqlDBcon')
var router = express.Router()

router.get('/', function(req, res, next){
    var queries = req.query
    var body = req.body
    var error = false
    
    if(!queries.buysIn){
        res.status(500).send('buys in was not especified')
        error = true
    }
    if(!error){
        if (queries.id >= 0) {
            var sql = 'SELECT * FROM company_clients where id = ? and buysIn = ?'
            dbCon.query(sql, [queries.id, queries.buysIn], function(err, rows){
                if(err){
                    res.status(500).send(err)
                    console.log(err);
                    return
                }
                if(rows.length <= 0){
                    res.status(404).send('No client found with the information provided')
                }else{
                    res.status(200).send(rows)
                }
            })
        } else {
            var sql = 'SELECT * FROM company_clients where buysIn = ?'
            dbCon.query(sql, [queries.buysIn], function(err, rows){
                if(err){
                    res.status(500).send(err)
                    console.log(err);
                    return
                }
                if(rows.length <= 0){
                    res.status(404).send('No client found with the information provided')
                }else{
                    res.status(200).send(rows)
                }
            })
        }
    }
})

router.post('/', function(req, res, next){
    var body = req.body
    var error = false

    if (!body.buysIn || !body.firstName || !body.lastName) {
        res.status(500).send('No client with valid firstname, lastname or where the clients buys in was especified')
        error = true
    }

    if (!error) {
        var sql = 'INSERT INTO company_clients SET ?'
        dbCon.query('SELECT * FROM company_clients WHERE buysIn = ? and firstName = ? and lastName = ?', [body.buysIn, body.firstName, body.lastName], function(err, rows){
            if (err) {
                res.status(500).send(err)
                console.log(err);
                return
            }
            if(rows.length > 0){
                res.status(500).send('Error, client already exists')
                return
            } else {
                dbCon.query(sql, [body], function (err, result) {
                    if (err) {
                        res.status(500).send(err)
                        console.log(err);
                        return
                    } else {
                        res.status(200).send({'message': `Client ${body.firstName + body.lastName} successfully added.`, 'data': result})
                    }
                })
            }
        })
    }
})

router.put('/', function(req, res, next){
    var queries = req.query
    var body = req.body
    var error = false

    if (!queries.id || !queries.buysIn) {
        res.status(500).send('No valid client id or the id of the organization where the client buys in was especified')
        error = true
    }

    if (!error) {
        var sql = 'UPDATE company_clients SET ? WHERE id = ? and buysIn = ?'
        dbCon.query('SELECT * FROM company_clients WHERE buysIn = ? and id = ?', [queries.buysIn, queries.id], function (err, rows) {
            if (err) {
                res.status(500).send(err)
                console.log(err);
                return
            }
            if (rows.length <= 0) {
                res.status(500).send('Error, client not found')
                return
            } else {
                dbCon.query(sql, [body, queries.id, queries.buysIn], function (err, result) {
                    if (err) {
                        res.status(500).send(err)
                        console.log(err);
                        return
                    } else if (result.message.includes('Changes: 0')){
                        res.status(200).send({'message': 'query executed but nothing changed'})
                    } else {
                        res.status(200).send({ 'message': `Client ${body.firstName + body.lastName} successfully added.`, 'data': result })
                    }
                })
            }
        })
    }
})

router.delete('/', function(req, res, next){
    var queries = req.query
    var body = req.body
    var error = false
    var sql = 'DELETE FROM company_clients WHERE id = ? and buysIn = ?'

    if (!queries.id || !queries.buysIn) {
        res.status(500).send('No valid client id or the id of the organization where the client buys in was especified')
        error = true
    }

    if (!error) {
        dbCon.query('SELECT * FROM company_clients WHERE buysIn = ? and id = ?', [queries.buysIn, queries.id], function (err, rows) {
            if (err) {
                res.status(500).send(err)
                console.log(err);
                return
            }
            if (rows.length <= 0) {
                res.status(500).send('Error, client not found with the information provided')
                return
            } else {
                dbCon.query(sql, [queries.buysIn, queries.id], function (err, result) {
                    if (err) {
                        res.status(500).send(err)
                        console.log(err);
                        return
                    } else if (result.affectedRows <= 0) {
                        res.status(200).send({ 'message': 'query executed but nothing deleted' })
                    } else {
                        res.status(200).send({ 'message': `Client ${queries.id} successfully deleted. from Organization ${queries.buysIn}`, 'data': result })
                    }
                })
            }
        })
    }
})


module.exports = router
