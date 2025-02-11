import { getTasks } from "@/lib/api";
import { Filters } from "@/types";
import { ITask } from "@/types/ITask";
import { useEffect, useState } from "react";

const useGetTasks = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<Filters>({
        name: '',
        priority: '',
        status: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const activeFilters = Object.fromEntries(
                    // eslint-disable-next-line
                    Object.entries(filters).filter(([_i, value]) => value !== '')
                );
                const fetchedTasks = await getTasks(activeFilters);
                setTasks(fetchedTasks);
                // eslint-disable-next-line
            } catch (error: any) {
                setError(error.response?.data?.message || "Unknown error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filters]);

    return {
        isLoading,
        tasks,
        error,
        setTasks,
        filters,
        setFilters,
    };
};

export default useGetTasks;