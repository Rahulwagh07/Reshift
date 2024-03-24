import { useRouter } from 'next/navigation';
import { IoIosArrowForward } from "react-icons/io";
import { Project } from '../../types/project';

interface SidebarProps {
    projects: Project[];
}
 

export default function Sidebar({ projects }: SidebarProps) {
    // console.log("PROJECTS", projects)
    const router = useRouter();
    const handleOnProjectClick = (projectId: string) => {
        return () => {
            router.push(`/admin/dashboard/${projectId}`);
        };
    }
    return (
        <div className="relative border-r w-[200px] mt-4 border-sky-500">
            {projects?.map((project) => (
                <div key={project._id} className='flex items-center ml-4 mb-2 cursor-pointer'
                    onClick={handleOnProjectClick(project._id)}>
                    <IoIosArrowForward className='mr-2'/> <span>{project.name}</span>
                </div>
            ))}
        </div>

    );
}
