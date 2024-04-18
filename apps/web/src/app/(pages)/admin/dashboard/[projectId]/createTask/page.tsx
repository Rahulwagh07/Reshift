import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useParams } from 'next/navigation';
import { Task } from '../../../../../../types/task';
import { apiConnector } from '../../../../../../lib/apiConnector';
import { IoIosCreate } from "react-icons/io";
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/store';
import { useEffect } from 'react';

const CreateTask = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Task>();
    const params = useParams<{ projectId: string }>();
    const projectId = params.projectId;
    const { token } = useSelector((state: RootState) => state.auth)
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false)

    const createTask = async (formData: Task) => {
        const toastId = toast.loading("Creating");
        try {
            const dataWithProjectId = { ...formData, projectId };
            const response = await apiConnector("POST", "/api/admin/createTask", dataWithProjectId);
           
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Task created");
            reset();
        } catch (error) {
            toast.error("Error. Please try again.");
        } finally {
            toast.dismiss(toastId);
        }
    };

    const getMemebers = async () => {
        setLoading(true)
        try {
            const response = await apiConnector("POST", "/api/admin/getmembers", {projectId}, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            });
    
            if (response.data.success === true) {
                setMembers(response.data.data.members);
            } 
            setLoading(false)
        } catch (error) {
            console.log("Failed to fetch Members", error);
        }
    }
     
    useEffect(() => {
        getMemebers();
    }, []);

    const onSubmit: SubmitHandler<Task> = async (formData) => {
        try {
            await createTask(formData);
        } catch (error) {
            console.error("Error creating task:", error);
            toast.error("pls try again.");
        }
    };

    return (
        <div className="w-full max-w-lg flex flex-col gap-2">
            <h2 className='text-center mt-8 text-3xl'>Create New Task</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="shadow-md border border-blue-150 mt-4 p-6 rounded-md  mb-4">
                <div className="mb-4">
                    <label className="block text-pure-greys-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border-sky-500 border rounded w-full py-2 px-3 text-pure-greys-700  focus:outline-none"
                        id="title"
                        type="text"
                        placeholder="Title"
                        {...register('title', { required: true })}
                    />
                    {errors.title && <span className="text-red-500 text-xs italic">Please enter a title</span>}
                </div>
                <div className="mb-4">
                    <label className="block text-pure-greys-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="shadow appearance-none border-sky-500 border  rounded w-full py-2 px-3 text-pure-greys-700   focus:outline-none"
                        id="description"
                        placeholder="Description"
                        {...register('description')}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-pure-greys-700 text-sm font-bold mb-2" htmlFor="dueDate">
                        Due Date
                    </label>
                    <input
                        className="shadow appearance-none border-sky-500 border  rounded w-full py-2 px-3 text-pure-greys-700   focus:outline-none"
                        id="dueDate"
                        type="date"
                        {...register('dueDate')}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-pure-greys-700 text-sm font-bold mb-2" htmlFor="priority">
                        Priority
                    </label>
                    <select
                        className="shadow appearance-none border-sky-500 border  rounded w-full py-2 px-3 text-pure-greys-700  focus:outline-none"
                        id="priority"
                        {...register('priority')}
                    >
                        <option value="" disabled>
                            Set the priority
                        </option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-pure-greys-700 text-sm font-bold mb-2" htmlFor="priority">
                        Assign To
                    </label>
                    <select
                        {...register("assignedUser", { required: true })}
                        defaultValue=""
                        id="assignedUser"
                        className="shadow appearance-none border-sky-500 border  rounded w-full py-2 px-3 text-pure-greys-700  focus:outline-none"
                        >
                        <option value="" disabled>
                            Select the member
                        </option>
                        {!loading &&
                            members?.map((member, index) => (
                            <option key={index} value={member?._id}>
                                {member?.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    className="border border-blue-150 flex gap-2 items-center py-2 px-4 rounded"
                    type="submit"
                >
                    <span className='font-semibold text-black'>Create</span> <IoIosCreate className='text-blue-200'/>
                </button>
            </form>
        </div>
    );
};

export default CreateTask;
