'use client'
import { Task } from "../types/Task";


type Props ={
    task: Task;
    onToggle: (id:number) => void;
    onDelete: (id:number) => void;
}
export default function TaskItem({ task, onToggle, onDelete}: Props) {
  return (
    <li className="mb-2 border-b pb-1 flex justify-between items-center">
        <span className={task.completed ? 'line-through text-gray-400': ''}>
            {task.text}
        </span>
        <div className="flex gap-2">
            <button 
                onClick={() => onToggle(task.id)}
                className="text-green-600"
                >
                ✅
            </button>
            <button
                onClick={() => onDelete(task.id)}
                className="text-red-500"
            >
                🗑
            </button>
        </div>
    </li>
  )
}
