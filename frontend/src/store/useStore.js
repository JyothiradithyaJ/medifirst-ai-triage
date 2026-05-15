import { create } from 'zustand';

const useStore = create((set) => ({
  // User State
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),

  // Rural Mode State
  isRuralMode: false,
  toggleRuralMode: () => set((state) => ({ isRuralMode: !state.isRuralMode })),

  // Chat State
  messages: [],
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, { ...message, id: Date.now(), timestamp: new Date() }] 
  })),
  clearMessages: () => set({ messages: [] }),

  // UI State
  isOffline: !navigator.onLine,
  setOffline: (status) => set({ isOffline: status }),

  // Health State
  recentTriage: [],
  addTriage: (result) => set((state) => ({ 
    recentTriage: [result, ...state.recentTriage].slice(0, 5) 
  })),
}));

export default useStore;
