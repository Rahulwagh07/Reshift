// Specific Project DashBoard

"use client"
import { useParams } from "next/navigation"

export default function ProjectPage() {
    const params = useParams<{ projectId: string;}>()
    const projectId = params.projectId;

    return (
        <div>You are on the project page </div>
    )
}