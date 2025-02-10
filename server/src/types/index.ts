import { Priority, Status } from "../interface/ITask";

export type ValidationProps = {
    options?: {
        isEdit?: boolean;
    },
    fields: {
        name?: string | null;
        priority?: Priority | null;
        status?: Status | null;
    };
};