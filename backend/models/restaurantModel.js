import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
    restaurantName : {
        type: String,
        default: ""
    },
    bio : {
        type: String,
        default: ""
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true,
    },
    isBusinessAccount : {
        type: Boolean,
        default: true
    },
    profilePic : {
        type: String,
        default: ""
    },
    address: {
        street : {
            type: String,
            default: ""
        },
        city : {
            type: String,
            default: ""
        },
        state : {
            type: String,
            default: ""
        },
        zipCode : {
            type: String,
            default: ""
        },
        country : {
            type: String,
            default: ""
        },
    },
    phone: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const restaurantModel = mongoose.model('Restaurant', RestaurantSchema);
export default restaurantModel;