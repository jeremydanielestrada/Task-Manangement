import { create } from "zustand";
import { supabase } from "../utils/supabase";

export const useTaskStore = create((set) => ({
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
}));
