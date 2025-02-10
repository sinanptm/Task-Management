import { NextFunction, Request, Response } from "express";
import Task from "../model/Task";
import { isValidObjectId } from "mongoose";
import { validateTask } from "../utils/validateTask";

const editTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { name, priority, status } = req.body;

        if (!isValidObjectId(id)) {
            res.status(400).json({ message: "Invalid task ID" });
            return;
        }

        const validationError = validateTask({
            fields: { name, priority, status },
            options: { isEdit: true }
        });

        if (validationError) {
            res.status(400).json({ message: validationError });
            return;
        }

        const task = await Task.findById(id);
        if (!task) {
            res.status(404).json({ message: "Tasks not found" });
            return;
        }

        task.name = name || task.name;
        task.priority = priority || task.priority;
        task.status = status || task.status;
        await task.save();

        res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        next(error);
    }
};


export default editTaskController;
