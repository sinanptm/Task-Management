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

export default interface ITask {
  readonly _id?: string;
  readonly name?: string;
  readonly priority?: Priority;
  readonly status?: Status;
  readonly createdAt?: string | Date;
  readonly updatedAt?: string | Date;
}