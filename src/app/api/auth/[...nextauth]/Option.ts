
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider  from "next-auth/providers/credentials"
import axios from "axios"
import { dbconnect } from "@/dbConfig/dbConfig"
import UserModel from "@/models/UserSchema"
import { error } from "console"
import bcrypt from "bcryptjs"

export const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text"  },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        await dbconnect();
        if(!credentials){
            throw new Error('Incomplete informations');
           return null
        }
        console.log(credentials.username);
         try{
         const user=await  UserModel.findOne({
             username:credentials.username
           });
          
           if(user===null){
            throw new Error('No user found with this username');
            return null
           }
           
           const ispasswordcorrect=bcrypt.compareSync(credentials.password, user.password);
          if(ispasswordcorrect){
            return user;
          }
          else {
            throw new Error("Username or password is Incorrect");
            return null
          }
         }
         catch (err){
            throw err 
            return null
         }  
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
     
      if (user && token) {
      token.profile=user?.profile;
        token.username = user?.username;
        return token;
      }
      return token;
    },
    async session({ session,token}) {
      if (token ) { 
        session.user.profile=token.profile
        session.user.username = token.username;
      }
     
      return session;
    },
  },
  secret: "12121212",
  session: {
    strategy: 'jwt',
  },
 pages:{
  signIn:'/signin'
 }

}
export default NextAuth(authOptions)