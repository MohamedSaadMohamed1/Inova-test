import express from 'express';
import { createStory, getStories, getStoryById, updateStory, deleteStory, rateStory, getStoriesByUserId, getHighRatedStories } from '../controllers/storyController';
import verifyToken from '../middlewares/authMiddleware';
const router = express.Router();

// Create a new story
router.post('/stories', verifyToken,createStory);

// Get all stories
router.get('/stories', getStories);

// Get all stories with high rate and sort 
router.get('/high-rated-stories', getHighRatedStories );

// Get all stories for one user 
router.get('/stories/user', verifyToken,getStoriesByUserId);

// Get a single story by ID
router.get('/stories/:id', getStoryById);

// Update a story by ID
router.put('/stories/:id', verifyToken,updateStory);

// Delete a story by ID
router.delete('/stories/:id',verifyToken, deleteStory);

// Rate a story
router.post('/stories/:id/ratings',verifyToken, rateStory);

export default router;
