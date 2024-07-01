import { dbconnect } from "@/dbConfig/dbConfig";
import PostModel from "@/models/Postschema";
import { authOptions } from "../auth/[...nextauth]/Option";
import axios from "axios";
import bcrypt from  "bcryptjs"
import { getServerSession } from "next-auth/next"
export async function POST( request:Request){
    await dbconnect();
    const {text,image}=await request.json();
    const session = await getServerSession(authOptions);
    const username=session?.user.username;
    const profile=session?.user.profile;
    if(!session?.user.username || !session?.user.profile ){
        return Response.json ({
            status:false,
            message:"You are should login or signup yourself"
        });
    }
    try{
    
    if(text && !image){
    const post =await PostModel.create({
       username,profile, text
    });
    await post.save();
    return Response.json ({
        status:true,
        message:"Blog posted"
    });
    }
    else if(image && !text){
        const post =await PostModel.create({
            username,profile, image
         });
         await post.save();
         return Response.json ({
             status:true,
             message:"Blog posted"
         });

    }
    else if(image && text){
        const post =await PostModel.create({
            username,profile, text,image
         });
         await post.save();
         return Response.json ({
             status:true,
             message:"Blog posted"
         });

    }
    else{
        return Response.json ({
            status:false,
            message:"Something went wrong"
        });
    }
}
    catch(err){
        return Response.json ({
            status:false,
            message:"Something went wrong"
        });
    }

}

export async function GET(request:Request) {
    await dbconnect();
 const session = await getServerSession(authOptions);
    if(!session?.user.username || !session?.user.profile ){
        return Response.json ({
            status:false,
            message:"You are should login or signup yourself"
        });
    }
  try{
    const post= await PostModel.find().sort({
        updated:-1
    });
    return Response.json({
        status:true,
        message:"Allright",
        post
        });
  }
  catch(err){
        return Response.json({
        status:false,
        message:"Something went wrong"
        });
  }





}