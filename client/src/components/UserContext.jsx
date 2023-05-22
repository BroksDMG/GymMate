import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContex= createContext({})

export function UserContextProvider({children}){
    const [user,setUser]=useState(null)
    useEffect(()=>{
        if(!user){
           axios.get("/profile").then(({data})=>{
               setUser(data)

           })
        }
    },[])
    return(
        <UserContex.Provider value={{user,setUser}}>
            {children}
        </UserContex.Provider>
    )
}