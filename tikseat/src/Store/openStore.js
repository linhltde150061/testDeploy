import create from "zustand";
import { persist } from "zustand/middleware";

let openStore = (set) => ({
  searchEvent: {},
  dopen: true,
  eventId: null,
  checkRefund: false,
  setCheckRefund: (check) => set(() => ({ checkRefund: check })),
  setSearchEvent: (data) => set(() => ({ searchEvent: data })),
  updateOpen: (dopen) => set((state) => ({ dopen: dopen })),
  setEventId: (eventId) => set(() => ({ eventId: eventId })),
});

openStore = persist(openStore, { name: "open_sider" });
export const useOpenStore = create(openStore);
