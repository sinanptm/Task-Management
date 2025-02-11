import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import TaskForm from "./TaskForm"
import { DialogFormProps } from "@/types"
import { memo } from "react";

const DialogForm = ({ isOpen, onClose, task, onSave }: DialogFormProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        </DialogHeader>
        <TaskForm
          task={task}
          onSave={(savedTask) => {
            onSave(savedTask)
            onClose()
          }}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  )
}

export default memo(DialogForm)
