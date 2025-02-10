export type Priority = "Low" | "Medium" | "High";
export type Status = "To Do" | "In Progress" | "Completed";

export default interface ITask {
    readonly _id?: string;
    readonly name?: string;
    readonly priority?: Priority;
    readonly status?: Status;
    readonly createdAt?: string | Date;
    readonly updatedAt?: string | Date;
}