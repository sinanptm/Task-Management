import { Schema, model, Document } from "mongoose";
import ITask from "../interface/ITask";

const taskSchema = new Schema<ITask & Document>(
  {
    name: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Completed"],
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