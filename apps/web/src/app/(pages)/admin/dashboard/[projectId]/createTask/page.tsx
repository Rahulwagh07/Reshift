import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useParams } from 'next/navigation';
import { Task } from '../../../../../../types/task';
import { apiConnector } from '../../../../../../lib/apiConnector';

const CreateTask = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Task>();
    const params = useParams<{ projectId: string }>();
    const projectId = params.projectId;

    const createTask = async (formData: Task) => {
        const toastId = toast.loading("Creating");
        try {
            const dataWithProjectId = { ...formData, projectId };
            const response = await apiConnector("POST", "/api/admin/createTask", dataWithProjectId);
            console.log(response);
        
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

    const onSubmit: SubmitHandler<Task> = async (formData) => {
        try {
            await createTask(formData);
        } catch (error) {
            console.error("Error creating task:", error);
            toast.error("pls try again.");
        }
    };

    return (
        <div className="w-full max-w-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-pure-greys-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-pure-greys-700  focus:outline-none"
                        id="title"
                        type="text"
                        placeholder="Title"
                        {...register('title', { required: true })}
                    />
                    {errors.title && <p className="text-red-500 text-xs italic">Please enter a title</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-pure-greys-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-pure-greys-700   focus:outline-none"
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
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-pure-greys-700   focus:outline-none"
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
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-pure-greys-700  focus:outline-none"
                        id="priority"
                        {...register('priority')}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <button
                    className="border border-red-500 font-bold py-2 px-4 rounded"
                    type="submit"
                >
                    Create Task
                </button>
            </form>
        </div>
    );
};

export default CreateTask;
