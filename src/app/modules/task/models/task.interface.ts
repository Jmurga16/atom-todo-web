export interface Task {
    id: string;
    userId: string;
    title: string;
    description: string;
    completed: boolean;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateTaskDTO {
    title: string;
    description?: string;
}

export interface UpdateTaskDTO {
    title?: string;
    description?: string;
    completed?: boolean;
}