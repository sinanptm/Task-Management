import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { type ITask, Priority, Status, type TaskData, TaskFormProps } from "@/types";
import { useState, useEffect, memo, useCallback } from "react";
import { useCreateTask } from "@/hooks/useCreateTask";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditTask } from "@/hooks/useEditTask";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  priority: z.nativeEnum(Priority),
  status: z.nativeEnum(Status),
});

const TaskForm = ({ task, onSave, onCancel }: TaskFormProps) => {
  const { createNewTask, error: createError } = useCreateTask();
  const { updateTask, error: updateError } = useEditTask();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: task?.name || "",
      priority: task?.priority || Priority.Medium,
      status: task?.status || Status.ToDo,
    },
  });

  useEffect(() => {
    if (createError || updateError) {
      toast({
        title: "Error",
        description: createError || updateError,
        variant: "destructive",
      });
    }
  }, [createError, updateError]);

  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      let savedTask: ITask;
      if (task) {
        savedTask = await updateTask(task._id!, values as TaskData);
      } else {
        savedTask = await createNewTask(values as TaskData);
      }
      onSave(savedTask);
      toast({
        title: "Success",
        description: `Task ${task ? "updated" : "created"} successfully`,
      });
    } catch (error) {
      console.error("Failed to save task:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [updateTask, createNewTask, onSave, task]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter task name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Priority).map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Status).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : task ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default memo(TaskForm);