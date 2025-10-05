import AddTaskModal from "../AddTaskModal";
import { useState } from "react";

const TaskList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <div className="bg-green-500 shadow-xl rounded w-full">
          <h1 className="text-xl font-bold text-center">To-Do</h1>
        </div>
        <div className="bg-blue-500 shadow-xl rounded w-full">
          <h1 className="text-xl font-bold text-center">In-progress</h1>
        </div>
        <div className="bg-gray-500 shadow-xl rounded w-full">
          <h1 className="text-xl font-bold text-center">Done</h1>
        </div>
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
