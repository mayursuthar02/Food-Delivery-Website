import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "",
    },
    availability : {
        type: Boolean,
        default: true
    },
    isVeg : {
        type: Boolean,
        default: true
    },
    deliveryTime : {
        type: String,
        default: '23min'
    },
    reviews: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Review',
        default: [],
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
}, {
    timestamps: true
});

const menuItemModel = mongoose.model('MenuItem', menuItemSchema);
export default menuItemModel;