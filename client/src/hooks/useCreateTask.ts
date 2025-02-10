import { useState } from 'react';
import {  TaskData } from '@/types';
import { createTasks } from '@/lib/api';

export const useCreateTask = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createNewTask = async (taskData: TaskData) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await createTasks(taskData);
            return response.task;
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to create task");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { createNewTask, isLoading, error };
};