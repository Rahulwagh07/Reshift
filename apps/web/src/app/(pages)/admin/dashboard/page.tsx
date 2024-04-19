"use client"
import { apiConnector } from '../../../../lib/apiConnector';
import { RootState } from '../../../../redux/store';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Project } from '../../../../types/project';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Spinner from '../../../../components/common/Spinner';
 
function AdminDashboard() {
    const {token} = useSelector((state: RootState) => state.auth)
    const [projects, setprojects] = useState<Project[]>([]);
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    const handleOnClick = (projectId: string) => {
        return () => {
            router.push(`/admin/dashboard/${projectId}`);
        };
    }

    const getAllproject = async () => {
        setLoading(true)
        try {
            const response = await apiConnector("PUT", "/api/admin/project", null, {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            });
    
            if (response.data.success === true) {
                setprojects(response.data.data);
            } 
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        getAllproject();
    }, []);
    
  return (
    <div className="w-10/12 flex flex-col items-center border border-red-500 mx-auto mt-8 p-4">
    <Link href={"/admin/createProject"} className='px-3 rounded-md py-2 border border-blue-150'>
        Create New
    </Link>
    <h2 className='text-3xl'>Your Projects</h2>
    {loading ? (
        <div className="flex justify-center items-center mt-20 mb-12">
        <Spinner />
        </div>
    ) : (
        <div className="grid lg:grid-cols-2 gap-8 mt-5">
        {projects?.map((project) => (
            <div
            key={project._id}
            className='flex flex-col items-center cursor-pointer border border-blue-150 p-3 rounded-md'
            onClick={handleOnClick(project._id)}
            >
            <span className='text-lg text-sky-400 font-semibold'>{project.name}</span>
            <p>{project.description}</p>
            </div>
        ))}
        </div>
    )}
    </div>
  )
}

export default AdminDashboard