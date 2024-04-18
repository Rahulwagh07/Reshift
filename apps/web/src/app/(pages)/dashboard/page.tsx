"use client"
import React, { useEffect, useState } from "react"
import { apiConnector } from "../../../lib/apiConnector"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import Task from "../../../models/Task"

export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const { token } = useSelector((state: RootState) => state.auth)

    const getAllTask = async () => {
        try{
            const response = await apiConnector("GET", "/api/dahsboard", null, {
                Authorization: `Bearer ${token}`
            })
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setTasks(response.data.data)
        } catch(error){
            console.log("Erron in fetching assigned task", error)
        }
    }

    useEffect(() => {
        getAllTask();
    }, []);

    return (
        <div>
            <h1>Your task</h1>
        </div>
    )
}