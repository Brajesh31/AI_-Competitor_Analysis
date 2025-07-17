// store/competitorStore.ts
//gpttt
import { create } from 'zustand'

type Competitor = { title: string, confidence: number }

export const useCompetitorStore = create<{
  competitors: Competitor[]
  setCompetitors: (data: Competitor[]) => void
}>((set) => ({
  competitors: [],
  setCompetitors: (data) => set({ competitors: data })
}))
