import { NextFunction, Request, Response } from "express";
import Task from "../model/Task";
import { StatusCode } from "../types";

const getTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await Task.find();

        res.status(StatusCode.Success).json({tasks});
    } catch (error) {
        next(error)
    }
};

export default getTaskController;