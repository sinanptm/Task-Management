import ConfirmDeleteDialog from "./components/ConfirmDeleteDialog";
import { useDeleteTask } from "@/hooks/useDeleteTask";
import DialogForm from "./components/TaskFormDialog";
import { memo, useCallback, useState } from "react";
import { ITask } from "./types/ITask";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useGetTasks from "@/hooks/useGetTasks";
import TaskList from "./components/TaskList";
import { toast } from "@/hooks/use-toast";
import TaskFilters from "./components/TaskFilters";

const App = () => {
  const { tasks, isLoading, error, setTasks, filters, setFilters } = useGetTasks();
  const [editingTask, setEditingTask] = useState<ITask | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);
  const { removeTask, isLoading: isDeleting } = useDeleteTask();

  const handleFilterChange = useCallback((key: keyof typeof filters, value: string) => {
    if (value === "all") {
      value = '';
    }
    setFilters(prev => ({ ...prev, [key]: value }));
  }, [setFilters]);

  const clearFilters = useCallback(() => {
    setFilters({
      name: '',
      priority: '',
      status: ''
    });
  }, [setFilters]);

  const handleEdit = useCallback((task: ITask) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (taskId: string) => {
      try {
        await removeTask(taskId);
        setTasks(prevTasks => prevTasks.filter((task) => task._id !== taskId));
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
    [removeTask, setTasks],
  );

  const handleAddTask = useCallback(() => {
    setEditingTask(null);
    setIsDialogOpen(true);
  }, []);

  const handleTaskSaved = useCallback(
    (updatedTask: ITask) => {
      setTasks(prevTasks => {
        if (editingTask) {
          return prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task));
        }
        return [...prevTasks, updatedTask];
      });
      setEditingTask(null);
      setIsDialogOpen(false);
    },
    [setTasks, editingTask],
  );

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <Button onClick={handleAddTask} size="sm">
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      <TaskFilters
        clearFilters={clearFilters}
        filters={filters}
        handleFilterChange={handleFilterChange}
        hasActiveFilters={hasActiveFilters}
      />

      <TaskList
        clearFilters={clearFilters}
        error={error!}
        filters={filters}
        handleEdit={handleEdit}
        isLoading={isLoading}
        tasks={tasks}
        setDeleteTaskId={setDeleteTaskId}
      />

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

export default memo(App);