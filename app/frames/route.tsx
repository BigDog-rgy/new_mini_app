/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

const handleRequest = frames(async (ctx) => {
  const { searchParams, state } = ctx;
  const pickedCharacter = searchParams.character;

  const character = pickedCharacter ?? state.character;

  const characterImages: Record<string, string> = {
  "Newt": "https://new-mini-app-psi.vercel.app/wendys_emp_1.webp",
  "Munchies": "https://new-mini-app-psi.vercel.app/wendys_emp_2.webp",
  "Carly": "https://new-mini-app-psi.vercel.app/wendys_emp_3.webp",
};

  let imageText = "";
  let buttons = [];

  if (!character) {
    imageText = "🧑‍🍳 Choose your character:";
    buttons = [
      <Button action="post" target={{ query: { character: "Newt" } }}>
        Newt
      </Button>,
      <Button action="post" target={{ query: { character: "Munchies" } }}>
        Munchies
      </Button>,
      <Button action="post" target={{ query: { character: "Carly" } }}>
        Carly
      </Button>,
    ];
  } else {
    imageText = `✅ You picked: ${character}`;
    buttons = [
      <Button action="post" target={{ query: { character: "" } }}>
        Pick Again
      </Button>,
    ];
  }

  return {
    image: characterImages[character] ?? "https://new-mini-app-psi.vercel.app/welcome_to_wendys.png",
    buttons,
    state: {
      step: "pickCharacter",
      character,
    },
  };
});

export const GET = handleRequest;
export const POST = handleRequest;