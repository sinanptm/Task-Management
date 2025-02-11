import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../types";
import Task from "../model/Task";

const getTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, priority, status } = req.query;
        
        const filter: any = {};
        
        if (name) {
            filter.name = { $regex: name as string, $options: 'i' }; 
        }
        
        if (priority) {
            filter.priority = priority;
        }
        
        if (status) {
            filter.status = status;
        }

        const tasks = await Task.find(filter);
        res.status(StatusCode.Success).json(tasks);
    } catch (error) {
        next(error);
    }
};

export default getTaskController;