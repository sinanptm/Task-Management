import { NextFunction, Request, Response } from "express";
import { validateTask } from "../utils/validateTask";
import Task from "../model/Task";

const createTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, priority, status } = req.body;

        const validationError = validateTask({ fields: { name, priority, status } });
        if (validationError) {
            res.status(400).json({ message: validationError });
            return;
        }

        const task = await Task.create({ name, priority, status });

        res.status(201).json({ task });
    } catch (error) {
        next(error);
    }
};

export default createTaskController;
