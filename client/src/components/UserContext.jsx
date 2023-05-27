import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContex= createContext({})

export function UserContextProvider({children}){

    const [user,setUser]=useState(null)
    const [ready,setReady]=useState(false)
    useEffect(()=>{
        if(!user){
           axios.get("/profile").then(({data})=>{
               setUser(data)
                setReady(true)
           })
        }
    },[])
    return(
        <UserContex.Provider value={{user,setUser,ready}}>
            {children}
        </UserContex.Provider>
    )
}