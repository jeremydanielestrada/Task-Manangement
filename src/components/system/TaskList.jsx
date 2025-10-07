/* eslint-disable react-hooks/exhaustive-deps */
import AddTaskModal from "../AddTaskModal";
import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { useTaskStore } from "../../stores/task";

const TaskList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks, loading, fetchAllTasks } = useTaskStore();

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const columns = [
    { title: "To-Do", status: "todo", color: "bg-green-500" },
    { title: "In-progress", status: "in-progres", color: "bg-blue-500" },
    { title: "Done", status: "done", color: "bg-gray-500" },
  ];

  return (
    <>
      <div className="my-4 md:w-72  lg:w-72">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer  font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-150 ease-in-out"
        >
          Add Task
        </button>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 gap-3">
        {columns.map((col) => (
          <div
            key={col.status}
            className={`${col.color} shadow-xl rounded w-full`}
          >
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-xl font-bold text-center">{col.title}</h1>
              <p className="text-lg font-bold">
                {tasks.filter((t) => t.status === col.status).length}
              </p>
            </div>
            {!loading &&
              tasks
                .filter((t) => t.status === col.status)
                .map((t) => {
                  return (
                    <TaskCard
                      key={t.id}
                      title={t.title}
                      description={t.description}
                    />
                  );
                })}
          </div>
        ))}
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Task"
      />
    </>
  );
};

export default TaskList;
