import { Priority, Status } from "../interface/ITask";

export type ValidationProps = {
    options?: {
        isEdit?: boolean;
    },
    fields: {
        name?: string | null;
        priority?: Priority | null;
        status?: Status | null;
    };
};

export enum StatusCode {
    Success = 200,
    Created = 201,
    BadRequest = 400,
    NotFound = 404,
    Conflict = 409,
    InternalServerError = 500,
 }
 