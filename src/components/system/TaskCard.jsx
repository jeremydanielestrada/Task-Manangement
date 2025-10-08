// In TaskCard.jsx, replace with:
import { Pen, Trash, GripVertical } from "lucide-react";

const TaskCard = ({ title, description, update, onDelete, dragHandle }) => {
  return (
    <div className="bg-white shadow-2xl  py-3  w-1/2  dark:bg-gray-400 rounded-lg mx-auto  ">
      <div className="flex gap-2 mx-3 justify-start">
        <div {...dragHandle} className="cursor-move mt-1">
          <GripVertical size={20} />
        </div>
        <Pen
          onClick={update}
          size={20}
          className="cursor-pointer font-semibold hover:text-blue-500"
        />
        <Trash
          onClick={onDelete}
          size={20}
          className="cursor-pointer font-semibold hover:text-red-500"
        />
      </div>
      <div className="flex items-start mx-4 gap-2">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-lg font-medium">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
