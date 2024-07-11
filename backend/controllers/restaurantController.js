import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';
import restaurantModel from '../models/restaurantModel.js';


export const SignupUser = async(req, res) => {
    try {
        const {restaurantName, email, password, phoneNo} = req.body;

        const existsUser = await restaurantModel.findOne({email, phone: phoneNo});
        if (existsUser) {
            return res.status(409).json({error: "User already exists on this email or phone Number!"});
        }

        // Hased Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new restaurantModel({
            restaurantName,
            email,
            password: hashedPassword,
            phone: phoneNo
        });
        await newUser.save();

        res.status(200).json({message: "User signup successfully."});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error in signup user "+error.message});
    }
}

export const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await restaurantModel.findOne({email});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) return res.status(401).json({error: "Invalid email and password"});

            
        // Generate token
        const token = jwt.sign({restaurantId: user._id}, process.env.JWT_SECRET, {
            expiresIn: '15d'
        });

        res.cookie("restaurant-token", token, {
            httpOnly: true, //more secure
            maxAge: 15 * 24 * 60 * 60 * 1000, //15 days
            sameSite: "strict" // CSRF
        });

        res.status(200).json({
            _id: user._id,
            restaurantName: user.restaurantName,
            bio: user.bio,
            email: user.email,
            profilePic: user.profilePic,
            address: user.address,
            phone: user.phone,
        });
            

    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error in login user "+error.message});
    }
}

export const UpdateRestaurantProfile = async(req,res) => {
    try {
        const {restaurantName, bio, email, address, phone} = req.body;
        let {profilePic} = req.body;
        const restaurantId = req.restaurant._id;
        
        const restaurant = await restaurantModel.findById(restaurantId);
        if(!restaurant) return res.status(400).json({error: "Restaurant not found"});
        if (profilePic) {
            if (restaurant.profilePic) {
                await cloudinary.uploader.destroy(restaurant.profilePic.split("/").pop().split(".")[0]);
            }
            const uploadedResponse = await cloudinary.uploader.upload(profilePic);
            profilePic = uploadedResponse.secure_url;
        }

        // // Update Restaurant
        restaurant.restaurantName = restaurantName || restaurant.restaurantName;
        restaurant.bio = bio || restaurant.bio;
        restaurant.email = email || restaurant.email;
        restaurant.profilePic = profilePic || restaurant.profilePic;
        restaurant.address = address || restaurant.address;
        restaurant.phone = phone || restaurant.phone;

        await restaurant.save();

        // // Password should be null in response
        restaurant.password = null;
        res.status(200).json(restaurant);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error in update restaurant "+error.message});
    }
}


export const logout = async(req,res) => {
    try {
        res.cookie("restaurant-token", "", { maxAge: 1 });
        res.status(200).json({message: "Restaurant User logged out."});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error in logout"+error.message});
    }
}