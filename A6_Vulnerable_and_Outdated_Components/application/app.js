var express = require('express')
var morgan = require('morgan')
var app = express()

app.use(morgan(' \\" + console.log(\'divi\'); +  //:method '))
app.use(morgan(' \\" + process.exit(); +  //:method '))
app.use(morgan(':method :url :status - :response-time ms'));

app.get('/', function (req, res) {
    res.send("Welcome to SwiftCourier")
})
app.listen(7777)