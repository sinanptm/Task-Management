import { NextFunction, Request, Response } from "express";

const createTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error) {
        next(error)
    }
};

export default createTaskController;