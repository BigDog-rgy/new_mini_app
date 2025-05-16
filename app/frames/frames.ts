import { createFrames } from "frames.js/next";

export type State = {
  step: "pickCharacter" | "confirmCharacter";
  character?: string;
};

export const frames = createFrames<State>({
  initialState: {
    step: "pickCharacter",
  },
  basePath: "/frames",
});