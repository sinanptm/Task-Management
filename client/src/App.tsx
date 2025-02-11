"use client";

import { memo, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus } from "lucide-react";
import useGetTasks from "@/hooks/useGetTasks";
import { type ITask, Priority, Status } from "@/types";
import { useDeleteTask } from "@/hooks/useDeleteTask";
import { toast } from "@/hooks/use-toast";
import DialogForm from "./components/TaskFormDialog";
import ConfirmDeleteDialog from "./components/ConfirmDeleteDialog";

const App = () => {
    const { tasks, isLoading, error, setTasks } = useGetTasks();
    const [editingTask, setEditingTask] = useState<ITask | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);
    const { removeTask, isLoading: isDeleting } = useDeleteTask();

    const handleEdit =useCallback( (task: ITask) => {
        setEditingTask(task);
        setIsDialogOpen(true);
    },[]);

    const handleDelete = useCallback(async (taskId: string) => {
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
    },[removeTask, setTasks, tasks ]);

    const handleAddTask = useCallback(() => {
        setEditingTask(null);
        setIsDialogOpen(true);
    },[]);

    const handleTaskSaved = useCallback((updatedTask: ITask) => {
        if (editingTask) {
            setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
        } else {
            setTasks([...tasks, updatedTask]);
        }
        setEditingTask(null);
        setIsDialogOpen(false);
    },[setTasks, tasks, editingTask]);

    if (isLoading) return <div>Loading tasks...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Task List</h1>
                <Button onClick={handleAddTask}>
                    <Plus className="mr-2 h-4 w-4" /> Add New Task
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                                No tasks found. Click 'Add New Task' to create one.
                            </TableCell>
                        </TableRow>
                    ) : (
                        tasks.map((task) => (
                            <TableRow key={task._id}>
                                <TableCell>{task.name}</TableCell>
                                <TableCell>
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
                                </TableCell>
                                <TableCell>
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
                                </TableCell>
                                <TableCell>{new Date(task.createdAt!).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="sm" onClick={() => handleEdit(task)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => setDeleteTaskId(task._id!)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            <DialogForm
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                task={editingTask!}
                onSave={handleTaskSaved}
            />
            <ConfirmDeleteDialog
                deleteTaskId={deleteTaskId!}
                isDeleting={isDeleting}
                handleDelete={handleDelete}
                setDeleteTaskId={setDeleteTaskId}
            />
        </div>
    );
}

export default memo(App);