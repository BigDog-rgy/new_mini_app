/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

const handleRequest = frames(async (ctx) => {
  const { searchParams, state } = ctx;

  const step = state?.step ?? "entree";
  const value = searchParams.value;

  let imageText = "";
  let buttons: JSX.Element[] = [];
  let nextStep: "entree" | "side" | "drink" | "done" = step;

  // Track full order
  let entree = state.entree;
  let side = state.side;
  let drink = state.drink;

  if (step === "entree") {
    imageText = value ? `🔥 You chose the ${value}!\nPick a side:` : `🍔 Welcome to Wendy’s!\nChoose your entrée:`;
    buttons = [
      <Button action="post" target={{ query: { value: "Dave's Single" } }}>Dave's Single</Button>,
      <Button action="post" target={{ query: { value: "Spicy Chicken Sandwich" } }}>Spicy Chicken Sandwich</Button>,
      <Button action="post" target={{ query: { value: "10pc Nuggets" } }}>10pc Nuggets</Button>,
    ];
    nextStep = "side";
    entree = value ?? entree;
  } else if (step === "side") {
    imageText = value ? `🧂 Side locked in: ${value}!\nNow pick your drink:` : `🍟 Pick your side:`;
    buttons = [
      <Button action="post" target={{ query: { value: "Fries" } }}>Fries</Button>,
      <Button action="post" target={{ query: { value: "Baconator Fries" } }}>Baconator Fries</Button>,
      <Button action="post" target={{ query: { value: "Chili" } }}>Chili</Button>,
    ];
    nextStep = "drink";
    side = value ?? side;
  } else if (step === "drink") {
    imageText = value
      ? `🥤 Got it — ${value} is on the tray.\nHere’s your full order:`
      : `🥤 Choose your drink:`;
    buttons = [
      <Button action="post" target={{ query: { value: "Coke" } }}>Coke</Button>,
      <Button action="post" target={{ query: { value: "Strawberry Lemonade" } }}>Strawberry Lemonade</Button>,
      <Button action="post" target={{ query: { value: "Vanilla Frosty" } }}>Vanilla Frosty</Button>,
    ];
    nextStep = value ? "done" : "drink";
    drink = value ?? drink;
  } else if (step === "done") {
    imageText = `✅ Your Wendy’s order:\n🍔 Entree: ${entree}\n🍟 Side: ${side}\n🥤 Drink: ${drink}\n\nEnjoy, legend.`;
    buttons = [
      <Button action="post">Start Over</Button>,
    ];
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
