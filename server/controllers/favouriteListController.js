import userModel from '../models/userModel.js';
import productModel from '../models/productModel.js';

//add products to user favourite list
const addToFavourite = async (req, res) => {
    try {
        const { userId, productId } = req.body
        
        console.log('🎁 Adding to favourite - userId:', userId, 'productId:', productId);

        const userData = await userModel.findById(userId)
        
        if (!userData) {
            console.log('❌ User not found:', userId);
            return res.json({ success: false, message: "User not found" })
        }
        
        let favoriteProducts = userData.favoriteProducts || [];
        
        console.log('📋 Current favorites:', favoriteProducts);

        if (favoriteProducts.includes(productId)) {
            console.log('⚠️ Product already in favourites');
            res.json({ success: false, message: "Product already in favourite list" })
        } else {
            favoriteProducts.push(productId)
            await userModel.findByIdAndUpdate(userId, { favoriteProducts })
            
            const product = await productModel.findOne({ _id: productId });
            console.log('✅ Added to favourites successfully');

            res.json({ success: true, message: "Added To Favourite", favouriteProduct: product })
        }
    } catch (error) {
        console.log('❌ Error adding to favourite:', error)
        res.json({ success: false, message: error.message })
    }
}

//delete products from user favourite list
const deleteFromFavourite = async (req, res) => {
    try {
        const { productId } = req.query
        const { userId } = req.body

        const userData = await userModel.findById(userId)
        
        if (!userData) {
            return res.json({ success: false, message: "User not found" })
        }
        
        let favoriteProducts = userData.favoriteProducts || [];

        const index = favoriteProducts.indexOf(productId)
        if (index > -1) {
            favoriteProducts.splice(index, 1)
        }

        await userModel.findByIdAndUpdate(userId, { favoriteProducts })

        res.json({ success: true, message: "Removed From Favourite" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//get user favourite list data
const getUserFavourite = async (req, res) => {
    try {
        const { userId } = req.body

        const userData = await userModel.findById(userId)
        
        if (!userData) {
            return res.json({ success: false, message: "User not found", favoriteProducts: [] })
        }
        
        let favoriteProducts = userData.favoriteProducts || [];

        res.json({ success: true, favoriteProducts })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message, favoriteProducts: [] })
    }
}

export { addToFavourite, deleteFromFavourite, getUserFavourite };