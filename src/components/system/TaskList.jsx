/* eslint-disable react-hooks/exhaustive-deps */
import AddTaskModal from "../AddTaskModal";
import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { useTaskStore } from "../../stores/task";
import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

//  Droppable column component
const DroppableColumn = ({ column, children }) => {
  const { setNodeRef } = useDroppable({ id: column.status });

  return (
    <div
      ref={setNodeRef}
      className={`${column.color} shadow-xl rounded w-full p-2 min-h-[200px]`}
    >
      {children}
    </div>
  );
};

// Reusable draggable task card
// Replace the DraggableTask component with this:
const DraggableTask = ({ task, onDelete, update }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <TaskCard
        title={task.title}
        description={task.description}
        onDelete={onDelete}
        update={update}
        dragHandle={listeners}
      />
    </div>
  );
};

const TaskList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks, loading, fetchAllTasks, deleteTask, updateTasksByDragging } =
    useTaskStore();
  const [taskData, setTaskData] = useState(null);

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const sensors = useSensors(useSensor(PointerSensor));

  const columns = [
    { title: "To-Do", status: "todo", color: "bg-green-500" },
    { title: "In-progress", status: "in-progres", color: "bg-blue-500" },
    { title: "Done", status: "done", color: "bg-gray-500" },
  ];

  const isUpdate = (task) => {
    setIsModalOpen(true);
    setTaskData(task);
  };

  const isAdd = () => {
    setIsModalOpen(true);
    setTaskData(null);
  };

  //  Helper: find which column a task currently belongs to
  const findContainer = (id) => {
    // If the id itself is a column
    if (columns.some((col) => col.status === id)) {
      return id;
    }

    // Otherwise, find the column based on task id
    const task = tasks.find((t) => t.id === id);
    return task ? task.status : null;
  };

  // Handle drag end event
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeStatus = findContainer(active.id);
    const overStatus = findContainer(over.id);

    if (!activeStatus || !overStatus) return;

    // if task stays in same column, do nothing
    if (activeStatus === overStatus) return;

    // update task status locally + backend
    await updateTasksByDragging(active.id, overStatus);
    await fetchAllTasks(); // refresh UI
  };

  return (
    <>
      <div className="my-4 md:w-72  lg:w-72">
        <button
          onClick={isAdd}
          className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer  font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-150 ease-in-out"
        >
          Add Task
        </button>
      </div>

      {/* DnD Context */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <div className="grid lg:grid-cols-3 md:grid-cols-3 gap-3">
          {columns.map((col) => {
            const columnTasks = tasks.filter((t) => t.status === col.status);
            return (
              <DroppableColumn key={col.status} column={col}>
                <div className="flex items-center justify-center gap-2">
                  <h1 className="text-xl font-bold py-3 text-center">
                    {col.title}
                  </h1>
                  <p className="text-lg font-bold">{columnTasks.length}</p>
                </div>

                <SortableContext
                  items={columnTasks.map((t) => t.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {!loading &&
                    columnTasks.map((t) => (
                      <DraggableTask
                        key={t.id}
                        task={t}
                        onDelete={() => deleteTask(t.id)}
                        update={() => isUpdate(t)}
                      />
                    ))}
                </SortableContext>
              </DroppableColumn>
            );
          })}
        </div>
      </DndContext>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={taskData ? "Update Task" : "Add Task"}
        taskData={taskData}
      />
    </>
  );
};

export default TaskList;
