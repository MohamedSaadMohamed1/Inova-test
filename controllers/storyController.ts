import { Request, Response } from "express";
import StoryModel, { IRating } from "../models/story";
import User from "../models/User";

export async function createStory(req: Request, res: Response) {
    try {
        const userId = (req as any).userId;
        const user = await User.findById(userId);
        if (!user) {
            res.status(400).json({ error: "User not found" });
            return;
        }
        const { title, body } = req.body;
        const newStory = new StoryModel({ title, body, author: user._id });
        const savedStory = await newStory.save();
        res.status(201).json(savedStory);
    } catch (error) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
}

export async function getStories(req: Request, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        const stories = await StoryModel.find().skip(skip).limit(limit);
        res.json(stories);
    } catch (error) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
}

export async function getStoriesByUserId(req: Request, res: Response) {
    try {
        const userId = (req as any).userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        const stories = await StoryModel.find({ author: userId }).skip(skip).limit(limit);

        res.json(stories);
    } catch (error) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
}
export async function getHighRatedStories(req: Request, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const stories = await StoryModel.find({ 'ratings.rating': { $gte: 4 } })
            .sort({ 'ratings.rating': -1 })
            .skip(skip)
            .limit(limit);

        res.json(stories);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

export async function getStoryById(req: Request, res: Response) {
    try {
        const story = await StoryModel.findById(req.params.id);
        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }
        res.json(story);
    } catch (error) {
        return res.status(401).json({ error: "Story not found" });
    }
}

export async function updateStory(req: Request, res: Response) {
    try {
        const userId = (req as any).userId;
        const user = await User.findById(userId);
        if (!user) {
            res.status(400).json({ error: "User not found" });
            return;
        }

        const { title, body, author } = req.body;
        const updatedStory = await StoryModel.findByIdAndUpdate(
            req.params.id,
            { title, body, author },
            { new: true }
        );
        if (!updatedStory) {
            return res.status(404).json({ message: "Story not found" });
        }
        res.json(updatedStory);
    } catch (error) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
}

export async function deleteStory(req: Request, res: Response) {
    try {
        const deletedStory = await StoryModel.findByIdAndDelete(req.params.id);
        if (!deletedStory) {
            return res.status(404).json({ message: "Story not found" });
        }
        res.json({ message: "Story deleted successfully" });
    } catch (error) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
}
export async function rateStory(req: Request, res: Response) {
    try {
        const userId = (req as any).userId;
        const user = await User.findById(userId);
        if (!user) {
            res.status(400).json({ error: "User not found" });
            return;
        }
        const { rating, comment } = req.body;
        const storyId = req.params.id;

        const story = await StoryModel.findById(storyId);
        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }

        const existingRatingIndex = story.ratings.findIndex(
            (rating: IRating) => rating.user.toString() === userId
        );
        if (existingRatingIndex !== -1) {
            return res
                .status(400)
                .json({ message: "You have already rated this story" });
        }

        story.ratings.push({ user: userId, rating, comment });
        await story.save();

        res.status(201).json(story);
    } catch (error) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
}
