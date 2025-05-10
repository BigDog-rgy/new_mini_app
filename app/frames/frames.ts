import { createFrames } from "frames.js/next";

export type State = {
  step: "start" | "entree" | "side" | "drink" | "done";
  entree?: string;
  side?: string;
  drink?: string;
};

export const frames = createFrames<State>({
  initialState: {
    step: "start",
  },
  basePath: "/frames",
});
