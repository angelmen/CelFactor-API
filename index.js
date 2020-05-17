const indexRouter = require("./indexHandler")
const companiesRouter = require("./src/companies/routes/companies")
const company_usersRouter =  require("./src/users/routes/users")
const company_clientsRouter = require("./src/clients/routes/clients")
const company_productsRouter = require('./src/products/routes/products')
const company_invoicesRouter = require('./src/invoices/routes/invoices')


const bodyParser = require("body-parser")
var express = require('express')
var app = express();
const port = 8000
const dbCon = require('./src/mongoDBcon')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/celfactor/v2/", indexRouter)
app.use("/celfactor/v2/companies/", companiesRouter)
app.use("/celfactor/v2/users/", company_usersRouter)
app.use("/celfactor/v2/clients/", company_clientsRouter)
app.use("/celfactor/v2/products/", company_productsRouter)
app.use("/celfactor/v2/invoices/", company_invoicesRouter)

app.listen(port, ()=>{
    console.log(`Servidor listo y escuchando en el puerto: TCP(${port})`);
})
