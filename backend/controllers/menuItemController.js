import menuItemModel from '../models/menuItemModel.js';
import {v2 as cloudinary} from 'cloudinary';

export const uploadMenuItem = async(req,res) => {
    try {
        const restaurantId = req.restaurant._id;
        const {itemName, category, price, isVeg, availability, description} = req.body; 
        let {image} = req.body;
        
        if (!image) {
            return res.status(400).json({error: "Images are not provided"});
        }
        // Upload image on cloudinary
        const uploadedResponse = await cloudinary.uploader.upload(image);
        image = uploadedResponse.secure_url;

        // Create a item
        const newItem = new menuItemModel({
            itemName,
            category,
            price,
            description,
            image,
            availability: availability == '1' ? true : false,
            isVeg : isVeg == '1' ? true : false,
            restaurantId
        });

        await newItem.save();

        res.status(200).json({message: "Item uploaded", newItem});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error in upload menu item "+error.message});
    }
}


export const getMenuItems = async(req,res) => {
    try {
        const restaurantId = req.restaurant._id;
        
        const menuItems = await menuItemModel.find({restaurantId}).sort({createdAt: -1});
        if (!menuItems) {
            return res.status(400).json({error: "MenuItems not found"});
        }        

        res.status(200).json(menuItems);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error in upload menu item "+error.message});
    }
}


export const updateMenuItem = async(req,res) => {
    try {
        const {id} = req.params;
        const {itemName, category, price, isVeg, availability, description} = req.body; 
        let {image} = req.body;

        const MAX_FILE_SIZE = 10485760; // 10 MB in bytes

        // Find the item
        const menuItem = await menuItemModel.findById(id);
        if (!menuItem) {
            return res.status(400).json({error: "MenuItem not found"});
        }
        
        // Update Image only if it's a new file (not a URL)
        if (image && !image.startsWith('http')) {

            // Decode the base64 image to check its size
            const base64Data = image.split(",")[1];
            const imageBuffer = Buffer.from(base64Data, 'base64');
            if (imageBuffer.length > MAX_FILE_SIZE) {
                return res.status(400).json({ error: "File size too large. Maximum is 10 MB." });
            }

            // Destroy old image in Cloudinary if it exists
            if (menuItem.image) {
                await cloudinary.uploader.destroy(menuItem.image.split("/").pop().split(".")[0]);
            }
            // Upload new image to Cloudinary
            const uploadedResponse = await cloudinary.uploader.upload(image);
            image = uploadedResponse.secure_url;
        }

        // Update item
        menuItem.itemName = itemName || menuItem.itemName;
        menuItem.category = category || menuItem.category;
        menuItem.price = price || menuItem.price;
        menuItem.isVeg = (isVeg === '1') ? true : (isVeg === '2') ? false : menuItem.isVeg;
        menuItem.availability = (availability === '1') ? true : (availability === '2') ? false : menuItem.availability;
        menuItem.description = description || menuItem.description;
        menuItem.image = image || menuItem.image;

        await menuItem.save();

        res.status(200).json({message: "Item updated", menuItem});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error in update menu item "+error.message});
    }
}


export const deleteMenuItem = async(req,res) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(404).json({error: "Menu item Id not found"});
        }
            
        const deleteitem = await menuItemModel.findByIdAndDelete(id);
        if (!deleteitem) {
            return res.status(404).json({error: "Item not found"});
        }

        res.status(200).json(deleteitem);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error in get delete menu item "+error.message});
    }
}


export const getAllItems = async(req, res) => {
    try {
        const allItems = await menuItemModel.find().sort({createdAt: -1});
        
        res.status(200).json(allItems);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error in get all items "+error.message});
    }
}


export const getItem = async(req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({error: "Item Id not found"});
        }

        const item = await menuItemModel.findById(id).populate('restaurantId', 'restaurantName address email phone');
        if (!item) {
            return res.status(400).json({error: "Item not found"});
        }

        res.status(200).json(item);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error in get item "+error.message});
    }
}


export const getRestaurantItems = async(req,res) => {
    try {
        const {id} = req.params;
        if(!id) {
            return res.status(400).json({error: "Id not found"});
        }

        const restaurantItems = await menuItemModel.find({restaurantId: id});
        if(!restaurantItems) {
            return res.status(400).json({error: "items not found"});
        }

        res.status(200).json(restaurantItems);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error in get item "+error.message});
    }
}


export const getItemsCategories = async(req,res) => {
    try {
        const {id} = req.params;
        if(!id) {
            return res.status(400).json({error: "Id not found"});
        }
        
        const categories = await menuItemModel.find({restaurantId: id}).distinct('category');
        if (!categories) {
            return res.status(400).json({error: "categories not found"});
        }

        res.status(200).json(categories);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error get item categories"+error.message});
    }
}


export const getItemsByCategory = async(req,res) => {
    try {
        const {category} = req.params;
        if (!category) {
            return res.status(400).json({error: "Category not found"});
        }

        const items = await menuItemModel.find({category});
        res.status(200).json(items);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Error get items by category"+error.message});
    }
}
