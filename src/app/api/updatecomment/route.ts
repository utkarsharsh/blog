import { dbconnect } from "@/dbConfig/dbConfig";
import PostModel from "@/models/Postschema";
import { authOptions } from "../auth/[...nextauth]/Option";
import axios from "axios";
import bcrypt from  "bcryptjs"
import { getServerSession } from "next-auth/next"

export async function POST( request:Request){
    await dbconnect();
    console.log("aaa")
    const {commentText,id}=await request.json();
    const session = await getServerSession(authOptions);
    const username=session?.user.username;
    const profile=session?.user.profile;
    if(!session?.user.username || !session?.user.profile ){
        return Response.json ({
            status:false,
            message:"You are should login or signup yourself"
        });
    }
    try {
        const data= await PostModel.findByIdAndUpdate(id,{
            $push:{
                comment:{
                    username,
                    profile,
                    message:commentText
                }
            }
        });
        return Response.json ({
            status:true,
            message:"All right"
        });
    }
    catch (err){
        return Response.json ({
            status:false,
            message:"You are should login or signup yourself"
        });
    }
    

}