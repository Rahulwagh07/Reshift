'use client'
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { IoIosCreate } from "react-icons/io";
import { useSelector } from 'react-redux';
import { apiConnector } from '../../../../lib/apiConnector';
import { Project } from '../../../../types/project';
import { RootState } from '../../../../redux/store';

const CreateProject = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Project>();
    const { token } = useSelector((state: RootState) => state.auth)
    const router = useRouter()

    const createProject = async (formData: Project) => {
        const toastId = toast.loading("Creating");
        try {
            const response = await apiConnector("POST", "/api/admin/project", formData, {
                Authorization: `Bearer ${token}`, 
            });
            
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Project created");
            router.push("/admin/dashboard")
        } catch (error) {
            toast.error("Error please try again.");
        } finally {
            toast.dismiss(toastId);
        }
    };
     
    const onSubmit: SubmitHandler<Project> = async (formData) => {
        try {
            await createProject(formData);
        } catch (error) {
            console.error("Error creating Project:", error);
            toast.error("pls try again.");
        }
    };

    return (
        <div className="w-full max-w-lg flex flex-col gap-2 mx-auto">
            <h2 className='text-center mt-8 text-3xl'>Create New Project</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="shadow-md border border-blue-150 mt-4 p-6 rounded-md  mb-4">
                <div className="mb-4">
                    <label className="block text-pure-greys-700 text-sm font-bold mb-2" htmlFor="title">
                        Project Name
                    </label>
                    <input
                        className="shadow appearance-none border-sky-500 border rounded w-full py-2 px-3 text-pure-greys-700  focus:outline-none"
                        id="title"
                        type="text"
                        placeholder="Title"
                        {...register('name', { required: true })}
                    />
                    {errors.name && <span className="text-red-500 text-xs italic">Please enter a title</span>}
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

export default CreateProject;
