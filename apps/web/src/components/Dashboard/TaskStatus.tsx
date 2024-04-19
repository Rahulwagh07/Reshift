import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { apiConnector } from '../../lib/apiConnector';
import { toast } from "react-hot-toast"
import { IoReturnUpBack } from "react-icons/io5";
import { Task } from '../../types/task';

type TaskStatusProps = {
  taskId: string;
  taskStatus: Task["status"];
  setIsOpen: (isOpen: boolean) => void;
  updateTaskStatus: (taskId: string, newStatus: Task["status"]) => void;
};

function TaskStatus({ taskId, taskStatus, setIsOpen, updateTaskStatus }: TaskStatusProps) {
  const { token } = useSelector((state: RootState) => state.auth);
  const [selectedStatus, setSelectedStatus] = useState<Task["status"]>(taskStatus);

  const handleOnClick = async () => {
    const toastId = toast.loading("updating..")
    try {
      if(taskStatus === selectedStatus){
        toast.success("You selected same status..")
        return;
      }
      const response = await apiConnector("PUT", "/api/updateStatus", {
        taskId,
        status: selectedStatus,
      }, {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
      if(response.data.success){
        updateTaskStatus(taskId, selectedStatus);
        toast.success("Status Updated");
      }
    } catch (error) {
      toast.error("Status not updated..")
      console.log("Error in updating task status", error);
    } finally{
        toast.dismiss(toastId)
        setIsOpen(false)
        return;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white relative p-8 rounded-lg">
        <IoReturnUpBack onClick={(() => setIsOpen(false))}
         className='absolute font-bold left-2 top-2 cursor-pointer' color='#9a3412' size={24}/>
        <h2 className="text-lg font-semibold mb-4">Update Task Status</h2>
        <div className="flex items-center mb-4">
          <label className="mr-2">Select Status:</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as Task["status"])}
            className="border border-sky-400 rounded-md px-2 py-1"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button onClick={handleOnClick} className="bg-blue-150 text-white px-4 py-2 rounded-md">
          Update
        </button>
      </div>
    </div>
  );
}

export default TaskStatus;
