import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';

export const SignupUser = async(req, res) => {
    try {
        const {fullName, email, password, phoneNo} = req.body;

        const existsUser = await userModel.findOne({email, phone: phoneNo});
        if (existsUser) {
            return res.status(409).json({error: "User already exists on this email or phone Number!"});
        }

        // Hased Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new userModel({
            fullName,
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
        const user = await userModel.findOne({email});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) return res.status(401).json({error: "Invalid email and password"});

            
        // Generate token
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: '15d'
        });

        res.cookie("token", token, {
            httpOnly: true, //more secure
            maxAge: 15 * 24 * 60 * 60 * 1000, //15 days
            sameSite: "strict" // CSRF
        });

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            address: user.address,
            phone: user.phone,
            favourite: user.favourite,
        });
            

    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error in login user "+error.message});
    }
}

export const logout = async(req,res) => {
    try {
        res.cookie("token", "", { maxAge: 1 });
        res.status(200).json({message: "User logged out."});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error in logout"+error.message});
    }
}

export const updateUserProfile = async(req,res) => {
    try {
        const {fullName, email, address, phone} = req.body;
        let {profilePic} = req.body;
        const userId = req.user._id;
        
        const user = await userModel.findById(userId);
        if(!user) return res.status(400).json({error: "User not found"});
        if (profilePic) {
            if (user.profilePic) {
                await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
            }
            const uploadedResponse = await cloudinary.uploader.upload(profilePic);
            profilePic = uploadedResponse.secure_url;
        }

        // // Update Restaurant
        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.profilePic = profilePic || user.profilePic;
        user.address = address || user.address;
        user.phone = phone || user.phone;

        await user.save();

        // // Password should be null in response
        user.password = null;
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error in update user "+error.message});
    }
}