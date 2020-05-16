const indexRouter = require("./indexHandler")
const companyRouter = require("./src/company/company")
const company_userRouter =  require("./src/company/company_user")
const company_clientRouter = require("./src/company/company_clients")
const productRouter = require('./src/products/routes/product')


const bodyParser = require("body-parser")
var express = require('express')
var app = express();
const port = 8000
const dbCon = require('./src/mongoDBcon')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/celfactor/v2/", indexRouter)
app.use("/celfactor/v2/company/", companyRouter)
app.use("/celfactor/v2/user/", company_userRouter)
app.use("/celfactor/v2/client/", company_clientRouter)
app.use("/celfactor/v2/product/", productRouter)

app.listen(port, ()=>{
    console.log(`Servidor listo y escuchando en el puerto: TCP(${port})`);
})
