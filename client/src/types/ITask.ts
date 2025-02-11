
export enum Priority {
    Low = "Low",
    Medium = "Medium",
    High = "High"
}

export enum Status {
    ToDo = "To Do",
    InProgress = "In Progress",
    Completed = "Completed"
}

export interface ITask {
    readonly _id?: string;
    name?: string;
    priority?: Priority;
    status?: Status;
    readonly createdAt?: string | Date;
    readonly updatedAt?: string | Date;
}

export type TaskData = {
    name: string;
    priority: Priority;
    status: Status;
};

