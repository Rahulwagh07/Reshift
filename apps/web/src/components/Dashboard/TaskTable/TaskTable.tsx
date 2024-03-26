import { apiConnector } from "../../../lib/apiConnector";
import { Task } from "../../../types/task";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CiChat1 } from "react-icons/ci";
import { Chatbox } from "../drawer";
 
 const TaskTable = ({projectId}:{projectId : string}) => {
    const {token} = useSelector((state: RootState) => state.auth)
    const [taskData, setTaskData] = useState<Task[]>([]);
    console.log("Projectid", projectId)
 
    const getAllTask = async () => {
        try {
            const response = await apiConnector("PUT", "/api/admin/createTask", {projectId}, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            });
    
            if (response.data.success === true) {
                setTaskData(response.data.data);
                console.log("res", response.data.data)
            } else {
                console.log("Failed to fetch Task data:", response.data.message);
            }
        } catch (error) {
            console.log("Error", error);
        }
    }
    
    useEffect(() => {
        getAllTask();
    }, []);

    
    return (
        <table className="min-w-full mt-8">
            <thead className="bg-slate-900">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sky-500 uppercase tracking-wider">
                        Task Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sky-500 uppercase tracking-wider">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sky-500 uppercase tracking-wider">
                        Priority
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sky-500 uppercase tracking-wider">
                        Assigned To
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-pure-greys-200">
                {taskData.map((task, index) => (
                    <tr key={task._id} className={index % 2 === 0 ? 'bg-pure-greys-50' : 'bg-white'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-pure-greys-900">{task.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-pure-greys-500">{task.status}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-pure-greys-500">{task.priority}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-pure-greys-500 flex items-center gap-2">{task.assignedUser?.name}
                        <Chatbox taskId={task._id} /></td>
                    </tr>
                ))}
            </tbody>
            
        </table>
    );
};

export default TaskTable;
 