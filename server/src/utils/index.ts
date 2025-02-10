import { Priority, Status } from "../interface/ITask";

export const validateTask = (name: string, priority: Priority, status: Status): string | null => {
    if (!name || !name.trim() || !priority || !status) return "name, status and priority fields are required.";
    if (!Object.values(Priority).includes(priority)) return "Invalid priority value.";
    if (!Object.values(Status).includes(status)) return "Invalid status value.";
    return null;
};

