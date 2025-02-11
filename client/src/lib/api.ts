import { baseApiUrl } from '@/config';
import TaskResponse from '@/types';
import { TaskData } from "@/types/ITask";
import { ITask } from "@/types/ITask";
import axios from 'axios';

const instance = axios.create({
    baseURL: `${baseApiUrl}/tasks`,
    headers: {
        "Content-Type": "application/json"
    }
});

export const getTasks = async (filters?: {
    name?: string;
    priority?: string;
    status?: string;
}): Promise<ITask[]> => {
    const params = new URLSearchParams();
    
    if (filters?.name) params.append('name', filters.name);
    if (filters?.priority) params.append('priority', filters.priority);
    if (filters?.status) params.append('status', filters.status);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    const response = await instance.get(`/${query}`);
    return response.data;
};

export const createTasks = async ({ name, priority, status }: TaskData): Promise<TaskResponse> => {
    const response = await instance.post("/", { name, priority, status });
    return response.data;
};

export const editTask = async (taskId: string, { name, priority, status }: TaskData): Promise<TaskResponse> => {
    const response = await instance.put(`/${taskId}`, { name, priority, status });
    return response.data;
};

export const deleteTask = async (taskId: string): Promise<{ message: string; }> => {
    const response = await instance.delete(`${taskId}`);
    return response.data;
};