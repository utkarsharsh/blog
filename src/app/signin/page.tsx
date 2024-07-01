'use client'
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from 'react'
import { boolean, z } from 'zod'
import { Sighupschema } from '@/schemas/user'
import { Button } from '@/components/ui/button'
import { motion, Variants } from "framer-motion";
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Navbar from '@/components/navbar/Navbar'
import { Loader2 } from "lucide-react"
import "./style.css"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
// import { toast, useToast } from "@/components/ui/use-toast"

const page = () => {
      const [loader,setloader]=useState<boolean>(false);
    interface Props {
        emoji: string;
        hueA: number;
        hueB: number;
      }
      
      const cardVariants: Variants = {
        offscreen: {
          y: 300
        },
        onscreen: {
          y: 50,
          rotate: -10,
          transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
          }
        }
      };
      
      const hue = (h: number) => `hsl(${h}, 100%, 50%)`;
      
      function Card({ emoji, hueA, hueB }: Props) {
        // const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;
        const background = `#000000`;
      
        return (
          <motion.div
            className="card-container"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: false, amount: 0.8 }}
          >
            <div className="splash" style={{ background }} />
            <motion.div className="card" variants={cardVariants} >
              <img src="https://cdn.prod.website-files.com/619cef5c40cb8925cd33ece3/621e3c9005658fc23c531509_619cef5c40cb89bb5133f8c6_template-vignette-HACKATHON-1200x900-FR.png" alt="" />
            </motion.div>
          </motion.div>
        );
      }
      
      const food: [string, number, number][] = [
        ["https://media.hackerearth.com/blog/wp-content/uploads/2019/09/Capture_HAckathon_wordpress.jpg", 340, 10],
      ];
    async function onsubmit(values: z.infer<typeof Sighupschema>){
      setloader(true)
        try{
          const answer=  await signIn("credentials",{username:values.username,password:values.password});
           
    }
        catch(err){
        console.log(err);
        }
        setloader(false)
  
    }
    const form = useForm<z.infer<typeof Sighupschema>>({
        resolver: zodResolver(Sighupschema),
        defaultValues:{
            username:"",
            password:"", 
        }
      },);

  return (
   <>
   <Navbar/>
   <div className='w-full mt-5 bg-gray-200  min-h-screen'>
    <div className='w-full flex justify-center items-center '>
    <div className=' w-[98%] sm:w-[80%] flex justify-center items-center m-4 p-3 bg-white'>

        <div className=' hidden md:block overflow-scroll h-[500px] w-[500px] p-4 m-6 bg-white rounded example border-r-2'>
        {
            food.map(([emoji, hueA, hueB]) => (
                <Card emoji={emoji} hueA={hueA} hueB={hueB} key={emoji} />
              ))
        }
 </div>
       <div className='w-[90%] md:w-[60%] bg-white p-5 rounded'>
          <div className=' flex flex-col w-full items-center justify-center'>
           <div className='mb-3 '>
        <h1 className='sm:text-4xl font-bold  text-2xl'>Welcome Again !</h1>
           </div>
          </div>


       <Form {...form}>
    <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="Username" {...field}  />
            </FormControl>
            <FormDescription>
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input placeholder="password" {...field}  />
            </FormControl>
            <FormDescription>
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      /> {
loader ? <>
  <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
</>:<Button type='submit'>Sign In</Button>

      }
      
       </form>
   </Form>

    <div>
      <h1 className=' text-gray-600 mt-4 '>Create an account ?<a href='/signup' className='text-sky-400'> SignUp</a> </h1>

    </div>
   </div>
</div>
    </div>
   </div>
   </>
  )
}

export default page