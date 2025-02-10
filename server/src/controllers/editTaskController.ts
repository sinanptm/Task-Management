import { NextFunction, Request, Response } from "express";
import { validateTask } from "../utils/validateTask";
import CustomError from "../types/CustomError";
import { isValidObjectId } from "mongoose";
import { StatusCode } from "../types";
import Task from "../model/Task";

const editTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { name, priority, status } = req.body;

        if (!isValidObjectId(id)) {
            throw new CustomError("Invalid task ID", StatusCode.BadRequest)
        }

        const validationError = validateTask({
            fields: { name, priority, status },
            options: { isEdit: true }
        });

        if (validationError) {
            throw new CustomError(validationError, StatusCode.BadRequest)
        }

        const task = await Task.findById(id);
        if (!task) {
            throw new CustomError("Tasks not found" , StatusCode.NotFound)
        }

        task.name = name || task.name;
        task.priority = priority || task.priority;
        task.status = status || task.status;
        await task.save();

        res.status(StatusCode.Success).json({ message: "Task updated successfully", task });
    } catch (error) {
        next(error);
    }
};


export default editTaskController;
