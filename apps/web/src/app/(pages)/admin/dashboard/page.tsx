"use client"
import { apiConnector } from '../../../../lib/apiConnector';
import { RootState } from '../../../../redux/store';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import PrivateRoute from '../../../../components/auth/PrivateRoute';
import Sidebar from '../../../../components/Dashboard/Sidebar';
import { Project } from '../../../../types/project';

function AdminDashboard() {
    const {token} = useSelector((state: RootState) => state.auth)
    const [projectData, setProjectData] = useState<Project[]>([]);

    const getAllproject = async () => {
        try {
            const response = await apiConnector("PUT", "/api/admin/project", null, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            });
    
            if (response.data.success === true) {
                setProjectData(response.data.data);
            } else {
                console.log("Failed to fetch project data:", response.data.message);
            }
        } catch (error) {
            console.log("Error", error);
        }
    }
    
    useEffect(() => {
        getAllproject();
    }, []);
    
  return (
    <PrivateRoute>
        <div className="relative flex sm:flex-col min-h-[calc(100vh-30.5rem)]">
        <Sidebar projects={projectData}/>
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-auto w-11/12 max-w-[800px] py-10">
          </div>
        </div>
    </div>
    </PrivateRoute>
  )
}

export default AdminDashboard