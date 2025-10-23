import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

export default function ProtectedRoute({children}: {children: ReactNode}){
  const {session} = useAuth()

  if(session=== undefined){
    return <div>Loading...</div>
  }
  return session ? <>{children}</> : <Navigate to='/signin'/>
}