import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fullName : {
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
    role : {
        type: String,
        default: 'GENERAL'
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
    favourite : {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Food",
        default: []
    },
}, {
    timestamps: true
});

const userModel = mongoose.model('User', UserSchema);
export default userModel;