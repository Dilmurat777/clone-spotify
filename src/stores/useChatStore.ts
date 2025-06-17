import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';

interface ChatStore {
  users: any[];
  fetchUsers: () => Promise<void>;
  isLoading: boolean;
  error: null;
}

export const useChatStore = create<ChatStore>((set) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.get('/users');
      set({ users: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
