/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

const handleRequest = frames(async (ctx) => {
  const { searchParams, state } = ctx;
  const pickedCharacter = searchParams.character;

  const character = pickedCharacter ?? state.character;

  const characterImages: Record<string, string> = {
  "Newbie Cashier": "/wendys_emp_1.png",
  "Veteran Fry Cook": "/wendys_emp_2.png",
  "Shift Manager": "/wendys_emp_3.png",
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
    image: (
      <div tw="flex flex-col items-center text-center whitespace-pre-wrap">
        <img src={characterImages[character] ?? ""} alt="Character" width="300" height="300" />
        <span tw="mt-4">{imageText}</span>
      </div>
    ),
    buttons,
    state: {
      step: "pickCharacter",
      character,
    },
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
