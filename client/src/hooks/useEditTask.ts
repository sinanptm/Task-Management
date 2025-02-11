import { editTask } from "@/lib/api";
import { TaskData } from "@/types";
import { useCallback, useState } from "react";

export const useEditTask = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateTask = useCallback(async (taskId: string, taskData: TaskData) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await editTask(taskId, taskData);
            return response.task;
            //eslint-disable-next-line
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to update task");
            throw err;
        } finally {
            setIsLoading(false);
        }
    },[]);

    return { updateTask, isLoading, error };
};