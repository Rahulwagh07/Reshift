// Specific Project DashBoard

"use client"
import { useState } from 'react';
import TaskTable from '@/components/Dashboard/TaskTable/TaskTable';
 
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Loading from '../loading';

export default function ProjectPage() {
    const params = useParams<{ projectId: string }>();
    const projectId = params.projectId;
    const [activeTab, setActiveTab] = useState('tasks');

    const renderComponent = () => {
        switch (activeTab) {
            case 'tasks':
                return <TaskTable projectId={projectId} />;
            case 'members':
                return <Loading />;
            case 'newTask':
                return <TaskTable projectId={projectId} />;
            default:
                return null;
        }
    };

    return (
        <div className="grid place-items-center">
            <div className="w-10/12 flex flex-col mt-2 items-center">
                <div className="flex gap-8">
                    <button
                        className={`text-sky-500 p-2 rounded-md ${activeTab === 'tasks' ? 'bg-slate-900' : ''}`}
                        onClick={() => setActiveTab('tasks')}
                    >
                    Task
                    </button>
                    <button
                        className={`text-sky-500 p-2 rounded-md  ${activeTab === 'members' ? 'bg-slate-900' : ''}`}
                        onClick={() => setActiveTab('members')}
                    >
                    Members
                    </button>
                    <button
                        className={`text-sky-500  p-2 rounded-md ${activeTab === 'newTask' ? 'bg-slate-900' : ''}`}
                        onClick={() => setActiveTab('newTask')}
                    >
                    New Task
                    </button>
                </div>
                {renderComponent()}
            </div>
        </div>
    );
}
