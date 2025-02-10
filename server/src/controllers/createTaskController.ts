import { NextFunction, Request, Response } from "express";
import { validateTask } from "../utils/validateTask";
import CustomError from "../types/CustomError";
import { StatusCode } from "../types";
import Task from "../model/Task";

const createTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, priority, status } = req.body;

        const validationError = validateTask({ fields: { name, priority, status } });
        if (validationError) {
            throw new CustomError(validationError, StatusCode.BadRequest)
        }

        const task = await Task.create({ name, priority, status });

        res.status(StatusCode.Created).json({ task });
    } catch (error) {
        next(error);
    }
};

export default createTaskController;
