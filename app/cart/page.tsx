"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { updateQty } from "../redux/cart/cartSlice"
import { RemoveProduct } from "../redux/cart/cartSlice"
import './cart.css'
import { useSelector,useDispatch } from "react-redux"
import { RootState,AppDispatch } from "../redux/store"
import { incrementQty,decrementQty,removeFromCart } from "../redux/cart/cartSlice"
import { getCart } from "../redux/cart/cartSlice"
export default function Cart(){
  const {items} = useSelector((state:RootState)=>state.cart)
  const dispatch=useDispatch<AppDispatch>()
  const router=useRouter()
  // useEffect(()=>{
  //   dispatch(getCart())
  // },[dispatch])
const handleIncrementQty=(item:any)=>{
  dispatch(incrementQty(item.productId))
  dispatch(updateQty({productId:item.productId,action:"INC"}))
}
const handleDecrementQty=(item:any)=>{
  if(item.quantity>1){
  dispatch(decrementQty(item.productId))
   dispatch(updateQty({productId:item.productId,action:"DEC"}))}

}
const handleRemoveCart=(id:string)=>{
  dispatch(removeFromCart(id))
  dispatch(RemoveProduct(id))
  

}
  return (
    <div className="flex flex-col gap-3 px-20 py-4">
      <h1 className="font-bold">Shopping Cart</h1>
       
      <div className="flex flex-col gap-5">
        {items?.map((item,index) => (
 
          <div key={index} className="flex px-4 w-200 bg-white border shadow-lg rounded-2xl gap-4">
            
       
            <div className="flex gap-2 items-center">
              <img src={item.image} className="object-contain w-40 h-40" />
              <p className="text-center truncate w-80">{item.description}</p>
            </div>

            <div className="ml-30 flex gap-5 items-center">
              <div className="flex gap-3 items-center">
                <button onClick={()=>handleIncrementQty(item)} className="text-black border border-black bg-white w-10 h-8 rounded">+</button>
                <span>{item.quantity}</span>
                <button  onClick={()=>handleDecrementQty(item)}   className="text-black bg-white border border-black w-10 h-8 rounded">-</button>
              </div>
              <p className="font-black">₹{(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={()=>handleRemoveCart(item.productId)} className="flex items-center gap-1 text-pink-500 font-semibold">
                <i className="fa-solid fa-trash-can"></i>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
