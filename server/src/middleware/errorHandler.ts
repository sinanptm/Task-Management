import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../types";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    res.status(StatusCode.InternalServerError).json({
        message: err.message || "Internal Server Error",
    });
};

export default errorHandler;
