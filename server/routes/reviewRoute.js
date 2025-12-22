import express from 'express';
import { 
    addReview, 
    getProductReviews, 
    getUserReviews, 
    getPendingReviews,
    canReview,
    updateReview,
    deleteReview,
    removeReviewImage
} from '../controllers/reviewController.js';
import authUser from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const reviewRouter = express.Router();

// Add review (with optional images - max 5)
reviewRouter.post('/add', authUser, upload.array('images', 5), addReview);

// Update review (with optional new images)
reviewRouter.put('/update/:reviewId', authUser, upload.array('images', 5), updateReview);

// Delete review
reviewRouter.delete('/delete/:reviewId', authUser, deleteReview);

// Remove specific image from review
reviewRouter.post('/remove-image/:reviewId', authUser, removeReviewImage);

// Get reviews for a specific product (public)
reviewRouter.get('/product/:productId', getProductReviews);

// Get user's reviews (requires auth)
reviewRouter.get('/user', authUser, getUserReviews);

// Get products pending review (requires auth)
reviewRouter.get('/pending', authUser, getPendingReviews);

// Check if user can review a product (requires auth)
reviewRouter.get('/can-review/:productId', authUser, canReview);

export default reviewRouter;
