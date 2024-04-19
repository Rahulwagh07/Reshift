export type Task = {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    priority?: 'low' | 'medium' | 'high';
    status: 'To-Do' | 'In Progress' | 'Completed';
    assignedUser?: string;  
}
