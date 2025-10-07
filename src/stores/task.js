import { create } from "zustand";
import { supabase } from "../utils/supabase";

export const useTaskStore = create((set) => ({
  tasks: [],
  loading: true,

  fetchAllTasks: async () => {
    const { data: tasks, error } = await supabase.from("tasks").select("*");

    if (error) console.log(error.message);

    set({ tasks: tasks, loading: false });
  },

  setTasks: (tasks) => set({ task: tasks }),
}));
