import mongoose, { Document, Schema, Types } from 'mongoose';

import { UserDocument } from '../models/User';


interface IStory extends Document {
  title: string;
  body: string;
  author: Types.ObjectId | UserDocument; 
  createdAt: Date;
  ratings: IRating[];
}


export interface IRating {
  user: Types.ObjectId | UserDocument; 
  rating: number;
  comment?: string;
}


const storySchema: Schema<IStory> = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'UserInfo', 
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  ratings: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'UserInfo'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: {
      type: String
    }
  }]
});


const StoryModel = mongoose.model<IStory>('Story', storySchema);

export default StoryModel;
