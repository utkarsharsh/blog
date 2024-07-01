import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string;
      isverified?: boolean;
       email?: string;
      username?: string;
      github?:string;
      profile?:string;
      bio?:string;
    } & DefaultSession['user'];
  }

 export interface User {
    _id?: string;
    isverified?: boolean;
     email?: string;
    username?: string;
    github?:string;
    profile?:string;
    bio?:string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id?: string;
    isverified?: boolean;
     email?: string;
    username?: string;
    github?:string;
    profile?:string;
    bio?:string;
  }
}