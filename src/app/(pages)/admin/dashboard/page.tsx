"use client"
import { apiConnector } from '@/lib/apiConnector';
import { RootState } from '../../../../redux/store';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

function AdminDashboard() {
    const {user} = useSelector((state: RootState) => state.profile);
    const userId = user?._id;
    const {token} = useSelector((state: RootState) => state.auth)
    

    const getAllproject = async () => {
        try{
            const response = await apiConnector("PUT", "/api/admin/project", {userId}, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
        })
            console.log(response)
        } catch(error) {
            console.log("Error", error)
        }
    }
    useEffect(() => {
        getAllproject();
    }, []);
  return (
    <div>Admin Dashboard</div>
  )
}

export default AdminDashboard