import mongoose, {Schema, model, models} from "mongoose";
import { stringify } from "postcss";

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    photos:[
        {type: String}
    ],
    category: {
        type: mongoose.Types.ObjectId || String,
        ref:'Category',
    },
    properties:{
        type: Object,
    },
},{
    timestamps: true,
});

export const Product = models?.Product || model('Product', ProductSchema);