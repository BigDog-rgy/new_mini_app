import { createFrames } from "frames.js/next";

export type State = {
  step: "meal" | "side" | "drink";
};

export const frames = createFrames<State>({
  initialState: {
    step: "meal",
  },
  basePath: "/frames",
});
