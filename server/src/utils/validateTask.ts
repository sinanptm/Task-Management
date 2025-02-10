import { Priority, Status } from "../interface/ITask";
import { ValidationProps } from "../types";


export const validateTask = ({ fields, options = { isEdit: false } }: ValidationProps): string | null => {
    const { name, priority, status } = fields;
    const { isEdit } = options;

    if (!isEdit) {
        if (!name || !priority || !status) {
            return "name, status and priority fields are required.";
        }
    }

    if (name !== undefined && (!name || !name.trim())) {
        return "name cannot be empty.";
    }

    if (priority !== undefined && priority !== null) {
        if (!Object.values(Priority).includes(priority)) {
            return "Invalid priority value.";
        }
    }

    if (status !== undefined && status !== null) {
        if (!Object.values(Status).includes(status)) {
            return "Invalid status value.";
        }
    }

    return null;
};