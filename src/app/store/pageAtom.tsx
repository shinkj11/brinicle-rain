import { atom } from "recoil";

export const pageAtom = atom({
  key: "pageAtom",
  default: {
    isPageChanging: false,
  },
});
