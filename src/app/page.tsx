"use client";
import { useEffect, useState } from "react";
import TaskItem from "./components/TaskItem";
import { Task } from "./types/Task";


export default function Home() {
  //logic
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  //Load of localStorage
  useEffect(() => {
    const data = localStorage.getItem('tasks')
    if (data) {
      setTasks(JSON.parse(data))
    }
  }, [])

  //Save in localStorage
  useEffect(() => {
    localStorage.setItem('tasks',JSON.stringify(tasks))
  },[tasks])

  const addTask = () => {
    if (input.trim() === "") return;
    const newTask: Task = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) => 
        t.id === id ? {...t, completed: !t.completed} : t
      )
    )
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }


  return (
    <main className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">ToDo App</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border px-2 py-1 rounded"
          type="text"
          placeholder="Write a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <TaskItem 
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>
    </main>
  );
}
