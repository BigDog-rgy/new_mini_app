import { createFrames } from "frames.js/next";

export type State = {
  step: "meal" | "side" | "drink" | "done";
  meal?: string;
  side?: string;
  drink?: string;
};

export const frames = createFrames<State>({
  initialState: {
    step: "meal",
  },
});
