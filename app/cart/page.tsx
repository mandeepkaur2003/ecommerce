"use client"
import { useEffect,useState } from "react"
import { serialize } from "v8"

export default function Cart(){
    type User={
        email:string
    }
    const [data,setData]=useState<User|null>(null)
    useEffect(()=>{
        const fetchData=async()=>{
            try{
const res=await fetch("http://localhost:3001/cart/",{
    credentials :"include"
})
    const user=await res.json()
    setData(user.sent)
        }
        catch(err){

        }
        }
        
   fetchData()
    },[])
    return (
        <p>{data?.email}</p>
    )
}