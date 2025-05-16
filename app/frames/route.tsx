/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
//import sceneData from "../scenes.json" assert { type: "json" };

const characterImages: Record<string, string> = {
  "Newt": "https://new-mini-app-psi.vercel.app/wendys_emp_1.webp",
  "Munchies": "https://new-mini-app-psi.vercel.app/wendys_emp_2.webp",
  "Carly": "https://new-mini-app-psi.vercel.app/wendys_emp_3.webp",
};

const handleRequest = frames(async (ctx) => {
  const { searchParams, state } = ctx;
  const selectedCharacter = searchParams.character ?? state.character;
  const step = state?.step ?? "pickCharacter";


  // === STEP: PICK CHARACTER ===
  if (step === "pickCharacter") {
  // Case: No character picked yet → show selection screen
  if (!selectedCharacter) {
    return {
      image: "https://new-mini-app-psi.vercel.app/welcome_to_wendys.png",
      buttons: [
        <Button action="post" target={{ query: { character: "Newt" } }}>Newt</Button>,
        <Button action="post" target={{ query: { character: "Munchies" } }}>Munchies</Button>,
        <Button action="post" target={{ query: { character: "Carly" } }}>Carly</Button>,
      ],
      state: { step: "pickCharacter" },
    };
  }

  // Case: Character was just picked → move to confirmation
  return {
    image: characterImages[selectedCharacter] ?? "https://dummyimage.com/1200x630/000/fff&text=Unknown+Character",
    buttons: [
      <Button action="post" target={{ query: { character: "" } }}>Pick Again</Button>
    ],
    state: {
      step: "confirmCharacter",
      character: selectedCharacter
    }
  };
}

  return {
    image: "https://dummyimage.com/1200x630/000/fff&text=Something+Went+Wrong",
    buttons: [
      <Button action="post" target={{ query: { character: "" } }}> Restart </Button>,
    ],
    state: {
      step: "pickCharacter",
    },
  };
});

export const GET = handleRequest;
export const POST = handleRequest;