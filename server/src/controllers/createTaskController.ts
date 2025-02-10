import { NextFunction, Request, Response } from "express";
import { validateTask } from "../utils/validateTask";
import Task from "../model/Task";
import { StatusCode } from "../types";

const createTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, priority, status } = req.body;

        const validationError = validateTask({ fields: { name, priority, status } });
        if (validationError) {
            res.status(StatusCode.BadRequest).json({ message: validationError });
            return;
        }

        const task = await Task.create({ name, priority, status });

        res.status(StatusCode.Created).json({ task });
    } catch (error) {
        next(error);
    }
};

export default createTaskController;
