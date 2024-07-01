"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import { useSession } from "next-auth/react"

// import Sighup from '../Sighup/Sighup'

const Navbar = () => {
    const { data } = useSession();
    const [isuser,setisuser]= useState<boolean>(false)
    const [show,setshow]= useState<boolean>(false)
    const user=data?.user;
//    useEffect(()=>{
//     if(user){
//       setisuser(true);
//     }
//    },[user])


  return (
    <div className='w-full border-b-4 pt-4 pb-4'>
   {show &&   <div className=' h-screen w-full absolute   opacity-50 bg-black z-10 top-0'>

      </div>}
    { show && <div className='absolute z-20 flex justify-center items-center rounded-md top-[100px] w-full'>
      
        <div className = 'p-7 relative w-full sm:w-[80%] md:w-[50%] bg-gray-100 rounded-md '>
        <div className='absolute top-[10px] right-[5px] text-center cursor-pointer
         text-black text-2xl font-bold rounded-full w-[40px] h-[40px]  border-2 border-black' onClick={()=>{setshow(false)}} >
X
      </div>
      </div>
      </div>}
        <div className=' w-full flex justify-center items-center pt-1 pb-1   '>
       <div className=' w-full flex justify-around items-center   '>
        <div className='flex justify-center items-center gap-6'>
           <div className=' text-3xl font-extrabold ml-2 '>BLOG</div> 
        </div>
        <div>

        <div className='flex justify-center items-center gap-3'>
           <><img src={user?.profile ? user?.profile :'https://assets.devfolio.co/assets/avatar@1x.png'} className='w-[50px] h-[50px] rounded-full'/></>
            
           <div className=''>
           <DropdownMenu >
  <DropdownMenuTrigger><p className='hover:text-blue-600 text-lg'>{user?.username}</p></DropdownMenuTrigger>
  <DropdownMenuContent className=' bg-black text-white'>
     <DropdownMenuItem className='p-3' onClick={()=>{signOut()}}>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
</div>
          </div>
        </div>
         </div>
         </div>
         </div>
  )
}

export default Navbar