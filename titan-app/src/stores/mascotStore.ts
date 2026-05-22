import { create } from "zustand";
import { MASCOTS, getMascotById, getDefaultMascot, type MascotDef } from "@/data/mascots";

interface MascotState {
  currentMascot: MascotDef;
  isPickerOpen: boolean;
  hasCompletedOnboarding: boolean;
  setMascot: (id: string) => void;
  openPicker: () => void;
  closePicker: () => void;
  completeOnboarding: () => void;
}

function loadOnboardingStatus(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem("titan-mascot-onboarding") === "true";
  } catch {
    return false;
  }
}

function loadMascotSelection(): MascotDef {
  if (typeof window === "undefined") return getDefaultMascot();
  try {
    const saved = localStorage.getItem("titan-mascot");
    if (saved) return getMascotById(saved);
  } catch {
    // ignore
  }
  return getDefaultMascot();
}

function persistMascot(id: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("titan-mascot", id);
  } catch {
    // ignore
  }
}

function persistOnboarding() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("titan-mascot-onboarding", "true");
  } catch {
    // ignore
  }
}

export const useMascotStore = create<MascotState>((set) => ({
  currentMascot: loadMascotSelection(),
  isPickerOpen: false,
  hasCompletedOnboarding: loadOnboardingStatus(),

  setMascot: (id: string) => {
    const mascot = getMascotById(id);
    persistMascot(id);
    set({ currentMascot: mascot, isPickerOpen: false });
  },

  openPicker: () => set({ isPickerOpen: true }),
  closePicker: () => set({ isPickerOpen: false }),

  completeOnboarding: () => {
    persistOnboarding();
    set({ hasCompletedOnboarding: true });
  },
}));
