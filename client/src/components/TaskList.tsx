import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Calendar } from "lucide-react";
import { TaskListProps } from "@/types";
import { Priority, Status } from "@/types/ITask";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { memo } from "react";

const TaskList = ({ clearFilters, error, filters, handleEdit, isLoading, setDeleteTaskId, tasks }: TaskListProps) => {
    if (isLoading) {
        return <div className="text-center py-8 text-muted-foreground">Loading tasks...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Error loading tasks: {error}</div>;
    }

    if (tasks.length === 0) {
        const hasActiveFilters = Object.values(filters).some(value => value !== '');
        return (
            <div className="text-center py-8 text-muted-foreground">
                {hasActiveFilters ? (
                    <>
                        No tasks match your filters.{" "}
                        <Button variant="link" onClick={clearFilters} className="p-0 h-auto">
                            Clear filters
                        </Button>
                    </>
                ) : (
                    "No tasks yet. Click 'Add Task' to create one."
                )}
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
                <Card key={task._id} className="flex flex-col">
                    <CardContent className="flex-grow p-4">
                        <h2 className="text-lg font-semibold mb-2">{task.name}</h2>
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
    );
};

export default memo(TaskList);