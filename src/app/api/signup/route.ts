import { dbconnect } from "@/dbConfig/dbConfig";
import  UserModel  from "@/models/UserSchema";
import { getServerSession } from "next-auth/next"
import axios from "axios";
import bcrypt from  "bcryptjs"
import { authOptions } from "../auth/[...nextauth]/Option";

export async function POST( request:Request){
    await dbconnect();
    
    const {username,profile,password}=await request.json();
     if(!username  || !profile || !password){
        return Response.json({
            status:false,
            message:"Fill up data properly"
        })
     }

    const user= await UserModel.findOne({username}); 
    if(user  ) {
        return Response.json({
            status:false,
            message:"username is already taken"
        })
    }
      var salt =  bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);
    const newuser= await UserModel.create({
        username,profile,password:hash
    });
    await newuser.save();
    
    return Response.json({
        status:true,
        message:"You are registered"
    })
    };



    
    