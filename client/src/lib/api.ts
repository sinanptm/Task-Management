import { baseApiUrl } from '@/config';
import TaskResponse, { ITask, TaskData } from '@/types';
import axios from 'axios';

const instance = axios.create({
    baseURL: `${baseApiUrl}/tasks`,
    headers: {
        "Content-Type": "application/json"
    }
});

export const getTasks = async (): Promise<ITask[]> => {
    const response = await instance.get("/");
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