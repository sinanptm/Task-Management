import { Schema, model, Document } from "mongoose";
import ITask, { Priority, Status } from "../interface/ITask";

const taskSchema = new Schema<ITask & Document>(
  {
    name: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: Object.values(Priority),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: "To Do",
    }
  },
  {
    timestamps: true,
    versionKey:false
  }
);

const Task = model<ITask & Document>("Task", taskSchema);

export default Task;