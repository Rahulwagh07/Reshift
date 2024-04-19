import { apiConnector } from "../../lib/apiConnector";
import { Task } from "../../types/task";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Chatbox } from "./drawer";
import formatDate from "../../lib/formateDate";
import Spinner from "../common/Spinner";
 
 const TaskTable = ({projectId}:{projectId : string}) => {
    const {token} = useSelector((state: RootState) => state.auth)
    const [taskData, setTaskData] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false)
 
    const getAllTask = async () => {
        setLoading(true)
        try {
            const response = await apiConnector("PUT", "/api/admin/createTask", {projectId}, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            });
    
            if (response.data.success === true) {
                setTaskData(response.data.data);
            }
            setLoading(false) 
        } catch (error) {
            console.log("Error", error);
            setLoading(false)
        }
    }
     
    useEffect(() => {
        getAllTask();
    }, []);

    
    return (
    <>
    {loading ? (
        <div className="flex justify-center items-center mt-20">
            <Spinner/>
        </div>
    ) : (
        taskData.length === 0 ? (
            <div className="flex justify-center mt-20">
                <p>Your Task will be shown here</p>
            </div>
        ) : (
            <table className="min-w-full mt-8 border border-sky-500 rounded-md">
                <thead className="bg-slate-900">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs 
                        font-medium text-sky-500 uppercase tracking-wider">
                            Task Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs 
                        font-medium text-sky-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs 
                        font-medium text-sky-500 uppercase tracking-wider">
                            TimeLine
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs 
                        font-medium text-sky-500 uppercase tracking-wider">
                            Assigned To
                        </th>
                    </tr>
                </thead>
                <tbody className="text-slate-900 font-semibold">
                    {taskData.map((task, index) => (
                        <tr key={task._id} className={`border-b border-blue-150 ${index % 2 === 0 ? 'bg-slate-100' : 'bg-slate-400'}`}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{task.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm ">{task.status}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm ">{formatDate(task.dueDate)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center gap-2">{task.assignedUser?.name}
                                <Chatbox taskId={task._id}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    )}
    </>
);
};

export default TaskTable;
 