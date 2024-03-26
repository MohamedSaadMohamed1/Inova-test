import { Request, Response } from 'express';
import User, { UserDocument } from '../models/User';

export async function userData(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      res.status(400).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({ data: user });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(400).json({ error: 'Internal server error' });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(400).json({ error: 'Error deleting user' });
  }
}

export async function paginatedUsers(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 2;
    const skip = (page - 1) * limit;
    const users = await User.find().select('-password').skip(skip).limit(limit);
    res.status(200).json({ data: users });
  } catch (error) {
    console.error('Error fetching paginated users:', error);
    res.status(400).json({ error: 'Error fetching paginated users' });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const updateData = req.body;

    const updatedUser: UserDocument | null = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      select: '-password' 
    });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ data: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({ error: 'Error updating user' });
  }
}