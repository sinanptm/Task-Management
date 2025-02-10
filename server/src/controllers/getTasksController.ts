import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../types";
import Task from "../model/Task";

const getTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await Task.find();

        res.status(StatusCode.Success).json({tasks});
    } catch (error) {
        next(error)
    }
};

export default getTaskController;