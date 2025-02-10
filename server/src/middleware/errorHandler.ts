import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../types";
import CustomError from "../types/CustomError";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let message = "Internal Server Error";
    let statusCode = StatusCode.InternalServerError;
    
    console.error(err);

    if(err instanceof CustomError){
        message = err.message;
        statusCode = err.statusCode;
    }

    res.status(statusCode).json({ message });
};

export default errorHandler;
