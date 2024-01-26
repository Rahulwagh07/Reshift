export type Task = {
    _id: string;
    title: string;
    description?: string;
    dueDate?: Date;
    priority?: 'low' | 'medium' | 'high';
    status?: 'To-Do' | 'In Progress' | 'Completed';
    assignedUser?: string;  
    comments?: Comment[];
}

export type Comment = {
    user: string;  
    text: string;
    createdAt: Date;
}
