"use client"
import PrivateRoute from "@/components/auth/PrivateRoute";
import { RootState } from "@/redux/store"
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
        </PrivateRoute>
    )
}