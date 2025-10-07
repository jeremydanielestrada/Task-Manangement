import { create } from "zustand";
import { supabase } from "../utils/supabase";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: true,

  //Fetch Tasks
  fetchAllTasks: async () => {
    const { data: tasks, error } = await supabase.from("tasks").select("*");

    if (error) console.log(error.message);

    set({ tasks: tasks, loading: false });
  },
  setTasks: (tasks) => set({ task: tasks }),

  //Add Tasks
  addTasks: async (formData) => {
    return await supabase.from("tasks").insert([formData]).select();
  },

  //Update Tasks
  updateTasks: async (formData) => {
    return await supabase
      .from("tasks")
      .update([formData])
      .eq("id", formData.id)
      .select();
  },

  //Delete Tasks
  deleteTask: async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (!error) {
      await get().fetchAllTasks(); // Refresh list from database
    }
  },
}));
