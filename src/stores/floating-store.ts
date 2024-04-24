import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type FloatingState = {
  isSidebarOpen: boolean
  setIsSidebarOpen: (isOpen: boolean) => void
  isFloatingOpen: boolean
  setIsFloatingOpen: (isOpen: boolean) => void
}

export const useFloatingStore = create<FloatingState>()(
  devtools(
    (set) => ({
      isSidebarOpen: false,
      setIsSidebarOpen: (isOpen: boolean) => set({ isSidebarOpen: isOpen }),
      isFloatingOpen: false,
      setIsFloatingOpen: (isOpen: boolean) => set({ isFloatingOpen: isOpen }),
    }),
    { enabled: process.env.NODE_ENV === 'development', name: 'Floating' }
  )
)
