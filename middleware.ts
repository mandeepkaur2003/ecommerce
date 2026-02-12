import { NextRequest,NextResponse } from "next/server";
export function middleware(req:NextRequest){
    const token=req.cookies.get("token")?.value
    const {pathname}=req.nextUrl
    const protectedRoute=[
        "/cart",
        "/profile"
        
    ]
    const authRoute=[
        "/login",
        "/signup"
    ]
    const isProtectedRoute=protectedRoute.some((route)=>
        pathname.startsWith(route)
    )
    const isAuthRoute=authRoute.some((route)=>
        pathname.includes(route)
    )
    if(isProtectedRoute&&!token){
        return NextResponse.redirect(new URL("/login",req.url))
    }
     if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
 return NextResponse.next()}
 export const config={
    matcher:["/cart/:path*","/login","/signup","/profile"]
 }
   
