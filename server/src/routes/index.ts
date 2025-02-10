import { Router } from "express";
import createTaskController from "../controllers/createTaskController";
import getTaskController from "../controllers/getTasksController";
import deleteTaskController from "../controllers/deleteTaskController";
import editTaskController from "../controllers/editTaskController";
import errorHandler from "../middleware/errorHandler";

const router = Router();

router.route("/tasks")
  .post(createTaskController)
  .get(getTaskController);

router.route("/tasks/:id")
  .delete(deleteTaskController)
  .put(editTaskController);

router.use(errorHandler);

export default router;
