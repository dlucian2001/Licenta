import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageSrc: { type: String, required: true },
    category: { type: String }, // Include tags field to store categories
});

export default model("Product", productSchema);
