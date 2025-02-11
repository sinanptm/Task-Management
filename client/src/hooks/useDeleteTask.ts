import { deleteTask } from "@/lib/api";
import { useCallback, useState } from "react";

export const useDeleteTask = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const removeTask = useCallback(async (taskId: string) => {
        try {
            setIsLoading(true);
            setError(null);
            await deleteTask(taskId);
            return true;
            //eslint-disable-next-line
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to delete task");
            throw err;
        } finally {
            setIsLoading(false);
        }
    },[]);

    return { removeTask, isLoading, error };
};