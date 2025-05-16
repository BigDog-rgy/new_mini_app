import { createFrames } from "frames.js/next";

export type State = {
  step: "pickCharacter" | "confirmCharacter" | "story";
  character?: string;
  path?: string[];
};

export const frames = createFrames<State>({
  initialState: {
    step: "pickCharacter",
    path: [],
  },
  basePath: "/frames",
});