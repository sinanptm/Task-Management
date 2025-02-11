import { getTasks } from "@/lib/api";
import { ITask } from "@/types";
import { useEffect, useState } from "react";

const useGetTasks = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true);
                const fetchedTasks = await getTasks();
                                
                setTasks(fetchedTasks);
                //eslint-disable-next-line
            } catch (error: any) {
                setError(error.response?.data?.message || "Unknown error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, []);

    return {
        isLoading,
        tasks,
        error,
        setTasks,
    };
};

export default useGetTasks;
