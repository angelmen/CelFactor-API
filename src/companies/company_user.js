const express =  require('express')
const router = express.Router();
const dbCon = require('../mysqlDBcon')

router.post('/add/', function(req, res, next){
    var error = false
    var body_data = { 
        email: req.body.email, 
        username: req.body.username, 
        location: req.body.location, 
        saltedPassword: req.body.saltedPassword, 
        worksFor: req.body.worksFor, 
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        userType: req.body.userType, 
        owned_company_id: req.body.owned_company_id, 
        active: req.body.active
    }
    if (!body_data.username || !body_data.saltedPassword || !body_data.active || !body_data.userType || !body_data.firstName || !body_data.lastName || !body_data.worksFor){
            error = true
            res.status(500).send('you must specify at least username, saltedpassword, company organization name that the user works for, active status and user type')
    }
    if(!error){
        dbCon.query('INSERT INTO company_users SET ?', req.body, function(err, result){
            if(err){
                console.log(err);
                res.status(500).send('system error')
                console.log(result);
                return
            }
            res.status(200).send('user successfully added')
        })
    }


})

router.get('/:organizationName&:username', function(req, res, next){
    var error = false
    let username = req.params.username
    let worksFor =  req.params.organizationName

    if(!username || !worksFor){
        res.status(500).send('Error, you must especify the company organization name and the username')
        error = true
        return
    }
    
    if(!error){
        dbCon.query('SELECT id, email, username, location, worksFor, firstName, lastName, userType, owned_company_id, active  FROM company_users WHERE username = ? and worksFor = ?', [username, worksFor], function(err, result){
            if (err){
                res.status(500).send('There was an error in the query')
                console.log(err);
                return
            }
            res.status(200).send(result);
        })
    }
})

router.put('/edit/:organizationName&:username', function(req, res, next){
    var body_data = req.body
    var username = req.params.username
    var company = req.params.organizationName
    var company_valid = false
    var error = false

    if(company){
        if (body_data.username !== username){
            res.status(500).send('You cant change que username of a user')
            error = true
            return
        }
    }else {
        res.status(500).send('You must especify the company orgaization name')
        errr = true
        return
    }
    if(!error){
        dbCon.query('SELECT organization_name FROM company WHERE organization_name = ?', company, function(err, result){
            if(err){
                res.status(500).send(err)
                console.log(err)
                return
            }
            if(result.length > 0){
                company_valid = true
            }
            if(company_valid){
                dbCon.query('UPDATE company_users SET ? WHERE username = ? and worksFor = ?', [body_data, username, company], function(err, result){
                    if(err){
                        res.status(500).send(err)
                        console.log(err);
                        return
                    }
                    if(!result.message.includes('Changed: 0')){
                        res.status(200).send({'message': 'user updated sucsessfully updated', 'data':result})
                    }else{
                        res.status(200).send({'message':'Query sucsessfully executed, but nothing has changed'})
                    }
                    
                })
            }
        })
    }

})

router.delete('/delete/:organizationName&:username', function(req, res, next){
    var body_data = req.body
    var username = req.params.username
    var company = req.params.organizationName
    var company_valid = false
    var error = false

    if(company){
        if (body_data.username !== username){
            res.status(500).send('You cant change que username of a user')
            error = true
            return
        }
    }else {
        res.status(500).send('You must especify the company orgaization name')
        errr = true
        return
    }
    if(!error){
        dbCon.query('SELECT organization_name FROM company WHERE organization_name = ?', company, function(err, result){
            if(err){
                res.status(500).send(err)
                console.log(err)
                return
            }
            if(result.length > 0){
                company_valid = true
            }
            if(company_valid){
                dbCon.query('DELETE FROM company_users WHERE username = ? and worksFor = ?', [username, company], function(err, result){
                    if(err){
                        res.status(500).send(err)
                        console.log(err);
                        return
                    }
                    if(result.affectedRows > 0){
                        res.status(200).send({'message': `user ${username} successfully deleted`, 'data': result})
                    }else{
                        res.status(200).send({'message': `there is no user with username ${username}`, 'data': result})
                    }
                    
                })
            }
        })
    }

})

module.exports = router;