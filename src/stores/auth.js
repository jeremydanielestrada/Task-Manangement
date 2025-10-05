import { create } from "zustand";
import { supabase } from "../utils/supabase";

export const useAuthStore = create((set) => ({
  userData: null,
  loading: true,

  //Fetch User
  fetchUser: async () => {
    const {
      data: {
        user: { id, email, user_metadata },
      },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user:", error.message);
      set({ loading: false });
    }

    set({
      userData: { id, email, ...user_metadata },
      loading: false,
    });
  },

  setUserData: (user) => set({ userData: user }),

  //Fetch user session
  fetchSession: async () => {
    const { data } = await supabase.auth.getSession();

    if (data.session) {
      const { id, email, user_metadata } = data.session.user;
      set({ userData: { id, email, ...user_metadata } });
    }

    return !!data.session;
  },

  setData: (data) => set({ userData: data }),

  signOutUser: async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) set({ userData: null });
  },
}));
