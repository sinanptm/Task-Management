import { NextFunction, Request, Response } from "express";

const getTaskController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).send("hey ")
    } catch (error) {
        next(error)
    }
};

export default getTaskController;