import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts =
async (req, res) =>{
    try{
          const products = await Product.find({});
    res.status(200).json({success:true, data: products});

    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).json({success:false, message: "Server error"});
    }
  
}

export const createProduct =
async (req,res)=> {
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
        res.status(404).json({success:false, message: "Product not found"});
    }


}

export const updateProduct =
async (req, res)=>
{
    const {id} = req.params;
    const {name, price, image} = req.body;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({success:false, message: "Invalid product ID"});
    }
    try{
       const updatedProduct = await Product.findByIdAndUpdate(id, {name,price,image}, {new:true});
       res.status(200).json({success:true, data: updatedProduct});
    }
    catch(error){
        res.status(404).json({success:false, message: "Product not found"});
    }
 }

 export const deleteProduct =
 async (req, res)=> 
{
    const {id} = req.params;
    // console.log("Product ID to delete:", id);

    try
    {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message: "Product deleted successfully"});
    }
    catch(error)
    {
        console.error(error.message);
        res.status(500).json({success:false, message: "Server error"});
    }
}