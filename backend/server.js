
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();


const app = express();

app.use(express.json()); // to parse JSON data from the request body

app.post("/api/products", async (req,res)=> {
    console.log("Request body:", req.body);
    // res.send("Server is ready")
    const {name, price, image} = req.body; 
    console.log("Parsed: ",{name, price, image});// user will send this data

    if(!name || !price || !image)
    {
        return res.status(400).json({success:false, message: "please provide all fields"});
    }

    const newProduct = new Product({name, price, image});

    try{
        await newProduct.save();
        res.status(201).json({success:true, data: newProduct});

    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).json({success:false, message: "Server error"});
    }

});



// console.log(process.env.MONGO_URI);

app.listen(5000, ()=>
{
    connectDB();
    console.log("Server started at http://localhost:5000 hello haha");
})