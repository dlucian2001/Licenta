import { RequestHandler } from "express";
import ProductModel from "../models/product";
import { v4 as uuidv4 } from 'uuid';
// Import the sendEmail handler

export const createProduct: RequestHandler = async (req, res, next) => {
    try {
        const { name, description, imageSrc, category } = req.body; // Update to receive category instead of tags
        const productId = generateUniqueId();
        const newProduct = await ProductModel.create({ productId, name, description, imageSrc, category }); // Assign category to newProduct
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
};

export const getProducts: RequestHandler = async (req, res, next) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

export const getProductById: RequestHandler = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = await ProductModel.findById(productId); // Use findById instead of findOne
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

export const getProductsByCategory: RequestHandler = async (req, res, next) => {
    try {
        const { category } = req.query; // Use req.query to get query parameters
        const products = await ProductModel.find({ category: category as string }); // Find products by category
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};


function generateUniqueId() {
    return uuidv4();
}
