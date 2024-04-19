"use client"
import React, { useEffect, useState } from "react"
import { apiConnector } from "../../../lib/apiConnector"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { Task } from "../../../types/task"
import Spinner from "../../../components/common/Spinner"
import formatDate from "../../../lib/formateDate"
import { MdEdit } from "react-icons/md";
import { Chatbox } from "../../../components/Dashboard/drawer"
import TaskStatus from "../../../components/Dashboard/TaskStatus"
 
export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const { token } = useSelector((state: RootState) => state.auth)
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [taskId, setTaskId] = useState<string>("");
    const [taskStatus, setTaskStatus] = useState<Task["status"]>("To-Do");
    
    const handleDropdownToggle = (taskId: string, status: Task["status"]) => {
        setTaskId(taskId);
        setTaskStatus(status)
        setIsOpen(!isOpen);
    };
    
    const getAllTask = async () => {
        setLoading(true)
        try{
            const response = await apiConnector("GET", "/api/dashboard", null, {
                Authorization: `Bearer ${token}`
            });
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            setTasks(response.data.data)
            setLoading(false)
        } catch(error){
            setLoading(false)
            console.log("Error in fetching assigned task", error)
        }
    };

    useEffect(() => { 
        getAllTask();
    }, []);


    return (
    <div className="w-10/12 flex flex-col items-center border border-red-500 mx-auto mt-8 p-4">
        <h2 className='text-3xl'>Task Assigned to you</h2>
        {loading ? (
          <div className="flex justify-center items-center mt-20 mb-12">
            <Spinner/>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8 mt-5">
            {tasks?.map((task: Task) => (
              <div key={task._id} className='flex flex-col relative border border-blue-150 p-3 rounded-md'>
                <div className="absolute right-4">
                  <Chatbox taskId={task._id}/>
                </div>
                <span className='text-lg text-sky-400 font-semibold'>{task.title}</span>
                <p>{task.description}</p>
                <div className="flex items-center gap-1 px-0">
                  <div onClick={() => handleDropdownToggle(task._id, task.status)} className="flex items-center gap-1 cursor-pointer border border-sky-400 rounded-md py-1 px-1 bg-blue-150">
                    <span>{task.status}</span> <MdEdit className="text-red-500"/>
                  </div>
                  <p>{formatDate(task.dueDate)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {isOpen && 
          <TaskStatus 
            taskId={taskId} 
            taskStatus={taskStatus} 
            setIsOpen={setIsOpen} 
            updateTaskStatus={(updatedTaskId, newStatus) => {
              // Update the task status in the local state
              setTasks(tasks.map(task => 
                task._id === updatedTaskId ? { ...task, status: newStatus } : task
              ));
            }}
          />
        }
    </div>
    )
}