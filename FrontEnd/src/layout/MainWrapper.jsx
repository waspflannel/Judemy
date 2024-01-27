import { useEffect , useState } from "react";
import { setUser } from "../utils/auth";

import React from 'react'

//wrapper that makes sure user is set before rendering 
const MainWrapper = ({children})  =>{
    const [loading , setLoading] = useState(true)

    useEffect(async ()=>{
        const handler = async () =>{
            setLoading(true)//set loading to false
            await setUser()//wait for setUser()
            setLoading(false)//after setUser set loading to false
        }
        handler()
        //if loading is fale return null otherwise render the children
    },[])
    return <>{loading?null : children}</>
}
export default MainWrapper