import { z } from "zod";

export const Sighupschema = z.object({
    username: z.string().min(1,"Username is required"),
    password:z.string().min(6,"Password should be of minimum 6 length"),
 
  });