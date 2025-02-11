import { Dispatch, SetStateAction } from "react";

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

export default interface TaskResponse {
    message?: string;
    task: ITask;
}

export interface TaskFormProps {
    task?: ITask;
    onSave: (task: ITask) => void;
    onCancel: () => void;
}

export interface DialogFormProps {
    isOpen: boolean;
    onClose: () => void;
    task?: ITask;
    onSave: (task: ITask) => void;
}

export type ConfirmDeleteProps = {
    deleteTaskId: string;
    isDeleting: boolean;
    handleDelete: (deleteTaskId: string)=>void;
    setDeleteTaskId: Dispatch<SetStateAction<string | null>>;
};