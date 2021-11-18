import create from "zustand"

type BearState = {
  bears: number
  increasePopulation: () => void
  removeAllBears: () => void
}

export const useStore = create<BearState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))
