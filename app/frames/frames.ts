import { createFrames } from "frames.js/next";

export type State = {
  step: "entree" | "side" | "drink" | "done";
  entree?: string;
  side?: string;
  drink?: string;
};

export const frames = createFrames<State>({
  initialState: {
    step: "entree",
  },
  basePath: "/frames",
});
