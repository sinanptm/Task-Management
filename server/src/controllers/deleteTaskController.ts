import { NextFunction, Request, Response } from "express";
import CustomError from "../types/CustomError";
import { isValidObjectId } from "mongoose";
import { StatusCode } from "../types";
import Task from "../model/Task";

const deleteTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskId = req.params.id;

        const validationError = await validate(taskId);
        if (validationError) {
            throw new CustomError(validationError, StatusCode.BadRequest)
        }

        await Task.findByIdAndDelete(taskId);
        res.status(StatusCode.Success).json({ message: "Task deleted successfully" });
    } catch (error) {
        next(error);
    }
};

const validate = async (taskId: string): Promise<string | null> => {
    if (!isValidObjectId(taskId)) {
       return "Invalid Id";
    }

    const task = await Task.findById(taskId);
    if (!task) {
        return "Task not found";
    }
    return null;
};


export default deleteTaskController;