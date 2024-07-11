import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    images: {
        type: String,
        required: true,
    },
    availability : {
        type: Boolean,
        default: true
    },
    isVeg : {
        type: Boolean,
        default: true
    },
    reviews: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Review',
        default: [],
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
    },
}, {
    timestamps: true
});

const productModel = mongoose.model('Product', ProductSchema);
export default productModel;