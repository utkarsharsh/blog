import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export interface User extends Document {
   username: string,
   password: string,
   profile: string,
}

const userDetailSchema: Schema<User> = new mongoose.Schema({
    username: {
       type: String,
       required: true
   },
   password: {
       type: String,
       required: true
   },
   profile: {
    type: String,
    required: true
}
}, {
   timestamps: true
});

const UserModel = mongoose.models.User || mongoose.model<User>('User', userDetailSchema);
export default UserModel;