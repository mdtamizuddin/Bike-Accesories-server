const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const productSchema = require('../Schemas/productSchema')
require('dotenv').config()
const Product = new mongoose.model('Product', productSchema)

router.get('/',(req , res) =>{
    Product.find({},(error, result)=>{
        if (error){
            res.status(501).send({message : "server side Error"})
        }
        else {
            res.status(200).send(result)
        }
    })
})
router.get('/:id',(req , res) =>{
    const id = req.params.id
    Product.findOne({'_id' : id},(error, result)=>{
        if (error){
            res.status(501).send({message : "server side Error"})
        }
        else {
            res.status(200).send(result)
        }
    })
})
router.post('/',(req , res) =>{
    const newProduct = new Product(req.body)
    newProduct.save((error)=>{
        if (error){
            res.status(500).json({ error: "Server Side Error" })
        }
        else{
            res.status(200).send({message: "Product Added Successful"})
        }
    })
})
router.put('/:id', (req , res) =>{
    const newProduct = req.body
    const id = req.params.id
    const quantity = newProduct.quantity
    console.log(quantity)
    const price = newProduct.price
     Product.updateOne({'_id': id} , {
        $set:{
            quantity : quantity,
            price: price
        }
    },(error , result)=>{
        if (error){
            res.status(500).json({ error: "Server Side Error" })
        }
        else{
            res.status(200).send({message: "Product Updated Successful" , result})
        }
    })
})
router.delete('/:id', (req , res)=>{
    const id = req.params.id
    Product.deleteOne({ '_id': id }, (err) => {
        if (err) {
            res.status(500).json({ error: "Server Side Error" })
        }
        else {
            res.status(200).json({ message: 'Product Deleted Success' })
        }
    })
})
module.exports = router