import React from "react"
import {Navigate,Outlet} from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthContext"


function ProtectedRouteUser(){

const {isAutenticated} = useAuthContext();

if(!isAutenticated) return <Navigate to ="/" replace />

   return <Outlet/>
}


export default ProtectedRouteUser













