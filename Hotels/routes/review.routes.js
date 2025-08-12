const express = require('express');
const router = express.Router();
const reviewController = require('../controller/review.controller');

// Reviews
router.post('/', reviewController.createReview);        // Add review
router.get('/', reviewController.getReviews);           // Get all reviews
router.get('/:id', reviewController.getReviewById);     // Get review by ID
router.put('/:id', reviewController.updateReview);      // Edit review
router.delete('/:id', reviewController.deleteReview);   // Delete review

module.exports = router;
