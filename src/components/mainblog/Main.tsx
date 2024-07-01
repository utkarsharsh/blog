"use client"
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Blog from '../blogs/Blog'
 import axios from 'axios'
import { toast } from '../ui/use-toast'
const Main = () => {
    const [text,settext]= useState<string>();
    const [loader,setloader]=useState<boolean>(false);
    const [image,setimage]=useState<string>();
    const [total,settotalpost]=useState<[]>()
    const { data } = useSession();
    const url=process.env.NEXT_PUBLIC_URL;
    async function handlepost() {
      if(!text && !image){
         toast({
            description:"Post is empty "
         })
         return;
      }
      setloader(true);
      const {data}=await axios.post(url+"/postablog",{text,image});
      if(data.status){
         toast({
            description:"Your post have been evaluated"
         })
         setloader(false)
         settext("");
      }
      else{
         toast({
            description:"Try again later"
         })
         setloader(false)
         settext("");
      }
      setloader(false)
      settext("");
        
    }
    const user=data?.user;
    async function handleurlchange(e:any){
        let x=e.target.files[0];
        console.log(x);
      const dat=new FormData();
      dat.append("file",x);
      dat.append("upload_preset","Brainop");
      const {data} =await axios.post("https://api.cloudinary.com/v1_1/disggmk1g/image/upload",dat) ;
      setimage(data.url);
    }
    async function handledata(){
      const {data}=await axios.get(url+"/postablog");
      if(data.status){
      settotalpost(data.post)
       }
       console.log(data.post)

    }

     useEffect(()=>{
        handledata();
     },[])




  return (
            <div className='w-full '>
            <div className='w-full justify-center items-center flex'>
            <div className='w-full sm:w-[90%] md:w-[50%] bg-gray-100 p-5'>
            <div className='w-full'>
             <div className='flex w-full pt-4 gap-4 items-center '>
                <div> 
                <Avatar className='w-[80px] h-[80px]'>
                <AvatarImage src={user?.profile} />
                <AvatarFallback>?</AvatarFallback>
                </Avatar>
                 </div>
                <Input  placeholder='write something' className=' p-7' onChange={(e:any)=>{settext(e.target.value)}} /> 
                <div>
                  { loader==false ?  <Button className='p-5' onClick={handlepost}>Share</Button>:
                     <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  wait
               </Button>}
                </div>
             </div>
             <div className='max-w-[300px] m-auto cursor-pointer'>
             <Input id="picture" type="file" onChange={handleurlchange} />
            </div>
            <div>
               {total?.map((e:any)=>{
             return  <Blog username={e?.username} profile={e?.profile} image={e?.image} comment={e?.comment} text={e?.text} id={e?._id}/>
               })}
           
            </div>

            </div>   
            </div>


            </div>
         </div>
  )
}

export default Main