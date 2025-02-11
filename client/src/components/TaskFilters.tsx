import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TaskFiltersProps } from "@/types";
import { Priority, Status } from "@/types/ITask";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

const TaskFilters = ({clearFilters, filters, handleFilterChange, hasActiveFilters}:TaskFiltersProps) => {
  return (
    <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          {hasActiveFilters && (
            <Button variant="destructive" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" /> Clear Filters
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-300" />
            <Input
              placeholder="Search by name..."
              value={filters.name}
              onChange={(e) => handleFilterChange('name', e.target.value)}
              className="pl-8 text-slate-300"
            />
          </div>

          <Select
            value={filters.priority}
            onValueChange={(value) => handleFilterChange('priority', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              {Object.values(Priority).map((priority) => (
                <SelectItem key={priority} value={priority}>
                  {priority}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {Object.values(Status).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
  )
}

export default TaskFilters