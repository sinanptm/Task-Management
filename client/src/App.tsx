import { memo, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, Calendar } from "lucide-react";
import useGetTasks from "@/hooks/useGetTasks";
import { type ITask, Priority, Status } from "@/types";
import { useDeleteTask } from "@/hooks/useDeleteTask";
import { toast } from "@/hooks/use-toast";
import DialogForm from "./components/TaskFormDialog";
import ConfirmDeleteDialog from "./components/ConfirmDeleteDialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const App = () => {
  const { tasks, isLoading, error, setTasks } = useGetTasks();
  const [editingTask, setEditingTask] = useState<ITask | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);
  const { removeTask, isLoading: isDeleting } = useDeleteTask();

  const handleEdit = useCallback((task: ITask) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (taskId: string) => {
      try {
        await removeTask(taskId);
        setTasks(tasks.filter((task) => task._id !== taskId));
        toast({
          title: "Success",
          description: "Task deleted successfully",
        });
      } catch (error) {
        console.error("Failed to delete task:", error);
        toast({
          title: "Error",
          description: "Failed to delete task",
          variant: "destructive",
        });
      }
      setDeleteTaskId(null);
    },
    [removeTask, setTasks, tasks],
  );

  const handleAddTask = useCallback(() => {
    setEditingTask(null);
    setIsDialogOpen(true);
  }, []);

  const handleTaskSaved = useCallback(
    (updatedTask: ITask) => {
      if (editingTask) {
        setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
      } else {
        setTasks([...tasks, updatedTask]);
      }
      setEditingTask(null);
      setIsDialogOpen(false);
    },
    [setTasks, tasks, editingTask],
  );

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading tasks...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <Button onClick={handleAddTask} size="sm">
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>
      {tasks.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No tasks yet. Click 'Add Task' to create one.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <Card key={task._id} className="flex flex-col">
              <CardContent className="flex-grow p-4">
                <h3 className="text-lg font-semibold mb-2">{task.name}</h3>
                <div className="flex justify-between items-center mb-2">
                  <Badge
                    variant={
                      task.priority === Priority.High
                        ? "destructive"
                        : task.priority === Priority.Medium
                          ? "default"
                          : "secondary"
                    }
                  >
                    {task.priority}
                  </Badge>
                  <Badge
                    variant={
                      task.status === Status.Completed
                        ? "success"
                        : task.status === Status.InProgress
                          ? "warning"
                          : "default"
                    }
                  >
                    {task.status}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {new Date(task.createdAt!).toLocaleDateString()}
                </div>
              </CardContent>
              <Separator />
              <CardFooter className="flex justify-end space-x-2 p-4">
                <Button variant="outline" size="sm" onClick={() => handleEdit(task)}>
                  <Pencil className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => setDeleteTaskId(task._id!)}>
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      {isDialogOpen && (
        <DialogForm
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          task={editingTask!}
          onSave={handleTaskSaved}
        />
      )}
      {deleteTaskId && (
        <ConfirmDeleteDialog
          deleteTaskId={deleteTaskId!}
          isDeleting={isDeleting}
          handleDelete={handleDelete}
          setDeleteTaskId={setDeleteTaskId}
        />
      )}
    </div>
  );
};

export default memo(App)

