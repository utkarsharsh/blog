
import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export interface Post extends Document {
   username: string,
   profile: string,
   text?:string,
   image?:string,
   comment:[{
      username:string,
      profile: string,
      message:string,
   }]
}

const postDetailSchema: Schema<Post> = new mongoose.Schema({
    username: {
       type: String,
       required: true
   },
   profile: {
       type: String,
       required: true
   },
   text: {
    type: String,
  },
   image: {
    type: String,
   },
   comment:[],
}, {
   timestamps: true
});

const PostModel = mongoose.models.Post || mongoose.model<Post>('Post', postDetailSchema);
export default PostModel;