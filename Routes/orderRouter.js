const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const orderSchema = require('../Schemas/orderSchema')
const verifyJWT = require('../verifyJWT')
const Order = new mongoose.model('UsersOrder', orderSchema)

router.get('/', (req, res) => {
    Order.find({}, (error, result) => {
        if (error) {
            res.status(501).send({ message: "server side Error" })
        }
        else {
            res.status(200).send(result)
        }
    })
})
router.get('/:id', (req, res) => {
    const id = req.params.id
    Order.findOne({ '_id': id }, (error, result) => {
        if (error) {
            res.status(501).send({ message: "server side Error" })
        }
        else {
            res.status(200).send(result)
        }
    })
})
router.post('/add',verifyJWT, async (req, res) => {
    const newOrder = new Order(req.body)
    newOrder.save((error)=>{
        if (error){
            res.status(500).json({ error: "Server Side Error" })
        }
        else{
            res.status(200).send({message: "Product Added Successful"})
        }
    })

})
router.delete('/:id',verifyJWT, (req, res) => {
    const id = req.params.id
    Order.deleteOne({ '_id': id }, (err) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json({ message: 'Order Deleted Success' })
        }
    })
})
module.exports = router