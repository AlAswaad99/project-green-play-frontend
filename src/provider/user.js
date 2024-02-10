import { create } from 'zustand';


export const useUserSessionStore = create((set) => ({
    userSession: null,
    setUserSession: (session) => set({ userSession: session }),
}));