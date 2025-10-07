const TaskCard = ({ title, description }) => {
  return (
    <div className="bg-white shadow-2xl p-3 w-1/2 my-2 dark:bg-gray-400 rounded-lg mx-auto">
      <h1 className="text-2xl  font-bold">{title}</h1>
      <p className="text-lg font-medium">{description}</p>
    </div>
  );
};

export default TaskCard;
