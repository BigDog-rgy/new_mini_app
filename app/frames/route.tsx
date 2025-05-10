/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

const handleRequest = frames(async (ctx) => {
  const { searchParams, state } = ctx;

  const step = state?.step ?? "entree";
  const value = searchParams.value;

  // Current order state
  let entree = state.entree;
  let side = state.side;
  let drink = state.drink;

  let imageText = "";
  let buttons: JSX.Element[] = [];
  let nextStep: "entree" | "side" | "drink" | "done" = step;

  if (step === "entree") {
    if (value) {
      entree = value;
      nextStep = "side";
    }

    imageText = value
      ? `🔥 You chose the ${value}!\nPick a side:`
      : `🍔 Welcome to Wendy’s!\nChoose your entrée:`;

    buttons = [
      <Button action="post" target={{ query: { value: "Fries" } }}>Fries</Button>,
      <Button action="post" target={{ query: { value: "Baconator Fries" } }}>Baconator Fries</Button>,
      <Button action="post" target={{ query: { value: "Chili" } }}>Chili</Button>,
    ];
  } else if (step === "side") {
    if (value) {
      side = value;
      nextStep = "drink";
    }

    imageText = value
      ? `🍟 Side locked in: ${value}!\nNow pick your drink:`
      : `🍟 Choose your side:`;

    buttons = [
      <Button action="post" target={{ query: { value: "Coke" } }}>Coke</Button>,
      <Button action="post" target={{ query: { value: "Strawberry Lemonade" } }}>Strawberry Lemonade</Button>,
      <Button action="post" target={{ query: { value: "Vanilla Frosty" } }}>Vanilla Frosty</Button>,
    ];
  } else if (step === "drink") {
    if (value) {
      drink = value;
      nextStep = "done";
    }

    imageText = value
      ? `🥤 Drink selected: ${value}.\nHere’s your full order:`
      : `🥤 Choose your drink:`;

    buttons = [
      <Button action="post" target={{ query: { value: "Start Over" } }}>Start Over</Button>,
    ];
  } else if (step === "done") {
    imageText = `✅ Your Wendy’s order:\n🍔 Entree: ${entree}\n🍟 Side: ${side}\n🥤 Drink: ${drink}\n\nEnjoy, legend.`;
    buttons = [
      <Button action="post">Start Over</Button>,
    ];

    // Reset everything
    nextStep = "entree";
    entree = undefined;
    side = undefined;
    drink = undefined;
  }

  return {
    image: <div tw="text-center whitespace-pre-wrap">{imageText}</div>,
    buttons,
    state: {
      step: nextStep,
      entree,
      side,
      drink,
    },
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
