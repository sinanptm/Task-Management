import { Dispatch, SetStateAction } from "react";
import { Priority, Status, ITask } from "./ITask";

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

export interface Filters {
    name: string;
    priority: Priority | '';
    status: Status | '';
}


export type TaskListProps = {
    isLoading:boolean;
    error:string;
    filters:Filters;
    clearFilters:()=>void;
    tasks:ITask[];
    handleEdit:(task:ITask)=>void;
    setDeleteTaskId:(taskId:string)=>void;
}


export type TaskFiltersProps = {
    hasActiveFilters:boolean;
    clearFilters:()=>void;
    filters:Filters;
    handleFilterChange:(key: keyof Filters, value: string)=>void;
}