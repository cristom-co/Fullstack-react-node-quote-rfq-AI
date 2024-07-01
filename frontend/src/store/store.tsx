import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { StoreState } from "../types/mainTypes";

const useRootStore = create<StoreState>()(
  devtools(
      (set) => ({
        listQuotes: [],        
        updateListQuoutes: (value) => set(() => ({ listQuotes: value })),
      }),

  )
);

export default useRootStore;