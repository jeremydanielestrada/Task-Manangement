/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { formActionDefault } from "../utils/supabase";
import { LoaderCircle } from "lucide-react";
import { useAuthStore } from "../stores/auth";
import { useTaskStore } from "../stores/task";

const AddTaskModal = ({ isOpen, onClose, title, taskData }) => {
  const { userData } = useAuthStore();
  const { addTasks, fetchAllTasks, updateTasks } = useTaskStore();
  const formDefault = {
    user_id: userData?.id,
    title: "",
    description: "",
    status: "",
  };
  const [form, setForm] = useState(formActionDefault);
  const [formAction, setFormAction] = useState(formActionDefault);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (taskData && Object.keys(taskData).length > 0) {
      setIsUpdate(true);
      setForm(taskData);
    } else {
      setIsUpdate(false);
      setForm(formDefault);
    }
  }, [taskData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormAction({ ...formAction, formProcess: true });

    const { data, error } = isUpdate
      ? await updateTasks(form)
      : await addTasks(form);

    if (error) {
      setFormAction({
        ...formAction,
        formErrorMessage: error.message,
        formStatus: false,
      });
    } else if (data) {
      setFormAction({
        ...formAction,
        formSuccessMessage: isUpdate
          ? "Updates Success Fully"
          : "Added Success Fully",
        formProcess: false,
      });

      await fetchAllTasks();

      setFormAction(formActionDefault);
      setForm(formDefault);
      onClose();
    }
  };

  if (!isOpen) return null; // 👈 hide modal kung false
  return (
    <div className="fixed inset-0  flex items-center justify-center z-10">
      {/* overlay background */}
      <div
        className="absolute inset-0  bg-gray-700 opacity-70"
        onClick={onClose} // click outside to close
      ></div>

      {/* modal content */}
      <div className=" rounded-lg dark:text-black bg-white shadow-lg p-6 z-10 w-lg relative transition-transform duration-300 scale-100">
        {/* header */}
        <h2 className="text-2xl  font-semibold mb-4">{title}</h2>

        {/* body */}
        <div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3">
              <div className="font-semibold text-center text-lg text-red-700">
                {formAction.formErrorMessage}
              </div>
              <div className="font-semibold text-center text-lg text-green-700 ">
                {formAction.formSuccessMessage}
              </div>
              <input
                type="text"
                className="border-2 border-blue-800  font-semibold rounded-lg  w-full p-2  focus:ring-2 focus:ring-blue-400   focus:border-transparent outline-none transition"
                name="title"
                placeholder="Title"
                onChange={handleChange}
                value={form.title}
              />
              <input
                type="text"
                className="border-2 border-blue-800  font-semibold rounded-lg  w-full p-2  focus:ring-2 focus:ring-blue-400   focus:border-transparent outline-none transition"
                name="description"
                placeholder="Description"
                onChange={handleChange}
                value={form.description}
              />
              <select
                className="border-2 border-blue-800  font-semibold rounded-lg  w-full p-2  focus:ring-2 focus:ring-blue-400   focus:border-transparent outline-none transition"
                name="status"
                placeholder="Status"
                onChange={handleChange}
                value={form.status}
              >
                <option value="">Select status</option>
                <option value="todo">Todo</option>
                <option value="in-progres">In-progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <button className=" my-5 w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-150 ease-in-out flex justify-center align-center ">
              {formAction.formProcess === true ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <span>{isUpdate ? "Update" : "Submit"}</span>
              )}
            </button>
          </form>
        </div>

        {/* close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AddTaskModal;
