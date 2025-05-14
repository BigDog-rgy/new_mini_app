import { createFrames } from "frames.js/next";

export type StoryState = {
  step: 
    | "pickCharacter"    // first screen
    | "choice1"          // fork #1
    | "choice2"          // fork #2
    | "choice3"          // fork #3
    | "ending";          // after all choices
  character?: string;   // e.g. “Newbie Cashier”
  path: string[];       // records each branch key, length up to 3
};

export const frames = createFrames<StoryState>({
  initialState: {
    step: "pickCharacter",
    path: [],
  },
});
