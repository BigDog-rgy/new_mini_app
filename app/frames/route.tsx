/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

const handleRequest = frames(async (ctx) => {
  const { searchParams, pressedButton, state } = ctx;

  const step = state?.step ?? "meal";
  const value = searchParams.value;

  let imageText = "";
  let buttons: JSX.Element[] = [];
  let nextStep: "meal" | "side" | "drink" = step;

  if (step === "meal") {
    imageText = value ? `You picked a ${value}! Now choose a side:` : `Choose your main:`;
    buttons = [
      <Button action="post" target={{ query: { value: "Fries" } }}>Fries</Button>,
      <Button action="post" target={{ query: { value: "Chili" } }}>Chili</Button>,
      <Button action="post" target={{ query: { value: "Apple Slices" } }}>Apple Slices</Button>,
    ];
    nextStep = "side";
  } else if (step === "side") {
    imageText = value ? `Nice, ${value} is a great side. Now grab a drink:` : `Choose your side:`;
    buttons = [
      <Button action="post" target={{ query: { value: "Coke" } }}>Coke</Button>,
      <Button action="post" target={{ query: { value: "Water" } }}>Water</Button>,
      <Button action="post" target={{ query: { value: "Lemonade" } }}>Lemonade</Button>,
    ];
    nextStep = "drink";
  } else if (step === "drink") {
    imageText = value
      ? `🥤 You picked ${value}.\nThat's a full meal! 🍔`
      : `Choose your drink:`;
    buttons = [
      <Button action="post">Start Over</Button>,
    ];
    nextStep = "meal";
  }

  return {
    image: <div tw="text-center whitespace-pre">{imageText}</div>,
    buttons,
    state: { step: nextStep },
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
