
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 5100
app.use(bodyParser.json())
app.use(cors())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wmsxu.mongodb.net/Manufacturer-website?retryWrites=true&w=majority`;

mongoose.connect(uri , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Database Is Connected'))
    .catch((err)=> console.log(err))


app.use('/users' , require('./Routes/usersRouter'))
app.use('/product' , require('./Routes/productRoute'))


app.listen(PORT, () => {
    console.log('Example app listening')
})
