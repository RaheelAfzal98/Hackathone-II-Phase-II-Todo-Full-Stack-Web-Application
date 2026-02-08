import React from 'react';
import { Task } from '@/types/Task';
import TaskCard from './TaskCard';
import SkeletonLoader from '../UI/SkeletonLoader';

interface TaskListProps {
  tasks: Task[];
  loading?: boolean;
  emptyMessage?: React.ReactNode;
  statusFilter?: 'all' | 'active' | 'completed';
  priorityFilter?: 'all' | 'low' | 'medium' | 'high';
  searchQuery?: string;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading = false,
  emptyMessage = 'No tasks found',
  statusFilter = 'all',
  priorityFilter = 'all',
  searchQuery = '',
  onToggleComplete,
  onDelete,
  onEdit
}) => {
  // Apply filters
  const filteredTasks = tasks.filter(task => {
    const statusMatch = statusFilter === 'all' ||
      (statusFilter === 'active' && !task.completed) ||
      (statusFilter === 'completed' && task.completed);

    const priorityMatch = priorityFilter === 'all' || task.priority === priorityFilter;

    const searchMatch = !searchQuery || searchQuery === '' ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return statusMatch && priorityMatch && searchMatch;
  });

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <SkeletonLoader key={index} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <>
        {emptyMessage}
      </>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTasks.map(task => (
        <div
          key={task.id}
          className="animate-fadeInSlideIn"
        >
          <TaskCard
            task={task}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;