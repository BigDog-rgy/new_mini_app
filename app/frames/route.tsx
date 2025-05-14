/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

const handleRequest = frames(async (ctx) => {
  const { searchParams, state } = ctx;
  const pickedCharacter = searchParams.character;

  const character = pickedCharacter ?? state.character;

  let imageText = "";
  let buttons = [];

  if (!character) {
    imageText = "🧑‍🍳 Choose your Wendy’s alter ego:";
    buttons = [
      <Button action="post" target={{ query: { character: "Newbie Cashier" } }}>
        Newbie Cashier
      </Button>,
      <Button action="post" target={{ query: { character: "Veteran Fry Cook" } }}>
        Veteran Fry Cook
      </Button>,
      <Button action="post" target={{ query: { character: "Shift Manager" } }}>
        Shift Manager
      </Button>,
    ];
  } else {
    imageText = `✅ Character selected: ${character}`;
    buttons = [
      <Button action="post" target={{ query: { character: "" } }}>
        Pick Again
      </Button>,
    ];
  }

  return {
    image: <div tw="text-center whitespace-pre-wrap">{imageText}</div>,
    buttons,
    state: {
      step: "pickCharacter",
      character,
    },
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
