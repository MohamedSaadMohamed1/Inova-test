import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  fname: string;
  lname: string;
  email: string;
  password: string;
  userType: string;
}

const userSchema = new Schema<UserDocument>({
  fname: String,
  lname: String,
  email: String,
  password: String,
  userType: String
});

export default mongoose.model<UserDocument>("UserInfo", userSchema);
