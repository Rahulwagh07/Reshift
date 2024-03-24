"use client"
 
 
import PrivateRoute from "../../../components/auth/PrivateRoute";
import { RootState } from "../../../redux/store";
import Link from "next/link";
import React from "react"
import { useSelector } from "react-redux"
export default function Dashboard() {
    const { user } = useSelector((state: RootState) => state.profile);

    let accountType: string = "";
    if (user !== null && typeof user === 'object') {
        accountType = user.accountType;
    }
 
    return (
        <PrivateRoute>
             <div>User DashBoard {accountType}</div>
            <Link href={'/admin/dashboard'} className="mt-12 border border-blue-150"> 
            Go to admin dashboard</Link>
   
        </PrivateRoute>
    )
}