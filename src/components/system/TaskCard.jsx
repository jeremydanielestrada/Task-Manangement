import { Pen, Trash } from "lucide-react";

const TaskCard = ({ title, description, update, onDelete }) => {
  return (
    <div className="bg-white shadow-2xl p-3 py-5 w-1/2 my-2 dark:bg-gray-400 rounded-lg mx-auto flex justify-between">
      <div>
        <h1 className="text-2xl  font-bold">{title}</h1>
        <p className="text-lg font-medium">{description}</p>
      </div>
      <div className="flex">
        <Pen
          onClick={update}
          className="cursor-pointer font-semibold hover:text-blue-500"
        />
        <Trash
          onClick={onDelete}
          className="cursor-pointer font-semibold hover:text-red-500"
        />
      </div>
    </div>
  );
};

export default TaskCard;
