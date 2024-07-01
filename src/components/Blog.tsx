'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from './ui/input'
import { toast } from './ui/use-toast'
import axios from "axios"
const Blog = ({username,profile,text,image,comment,id}:{username:string,profile:string,text:string,image:string,comment:any[],id:string}) => {
        
    const [commentText,setcommentText]=useState<string>()
    const [show,setshow]=useState<boolean>(false)
    const url=process.env.NEXT_PUBLIC_URL;
    async function handlecomment(){
          if(!commentText){
          toast({
            description:"Comment box is empty"
          });
          return
          }
          console.log(url+"updatecomment");
          const {data}= await axios.post(url+"updatecomment",{
            id,commentText
          });
          if(data.status){
            toast({
                description:"Successfully commented refresh"
              });
              setcommentText("");
              return
          }
          
          toast({
            description:"Something went wrong"
          });
          setcommentText("");
    }






  return (
    <div className='w-full p-3 relative'>
      <div className=' w-full '>
      <div className={`absolute w-full  z-30 ${show ? 'block': 'hidden'}`} >
        <div className=' bg-white w-full h-[500px] p-3 flex flex-col relative '>
            <h1 className='absolute top-1 text-center left-1 text-xl font-bold  cursor-pointer rounded-full border-2 border-black w-[30px] h-[30px]' onClick={()=>{setshow(false)}}>X</h1>
            <div className=' h-[450px] overflow-y-auto gap-1 bg-gray-200 p-2 mb-3'>
                { comment && comment.map((e:any)=>{
                    return <>
                     <div className='p-2 m-2 bg-white rounded-lg'>
        <div className='flex gap-2 items-center '>
        <Avatar className=''>
        <AvatarImage src={e?.profile} />
        <AvatarFallback>?</AvatarFallback>
        </Avatar>
        <h1>{e?.username}</h1>
        </div> 
        <p className='m-3 text-gray-600'>
           {e?.message}
        </p>
        </div>
                    </>
                    
                })}    
        </div>
        <div>
        <div className='flex gap-2 w-full '>
            <Input className='' value={commentText} onChange={(e:any)=>{setcommentText(e.target.value)}} /> 
            <Button onClick={handlecomment}>Comment</Button>
        </div>
        </div>
        </div>
        </div>
        <div className='flex gap-2 items-center mb-3'>
        <Avatar className=''>
        <AvatarImage src={profile} />
        <AvatarFallback>?</AvatarFallback>
        </Avatar>
        <h1>{username}</h1>
        </div>
        {
            text &&
        <div className=' mb-3'>
        <p className='text-gray-500'>
           {text}
        </p>
        
        </div>}
        {image && 
        <div className='w-full flex justify-center items-center'>
         <img src={image} className='md:w-[600px] md:h-[500px]' alt="" />
        </div>}
        <div className='mt-3 w-full flex justify-center'>
          <Button className='md:w-[80%] sm:w-[90%] w-[80%] ' onClick={()=>{setshow(true)}}>Comments</Button>
        </div>
        

      </div>

    </div>
  )
}

export default Blog