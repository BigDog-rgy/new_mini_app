/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

const handleRequest = frames(async (ctx) => {
  const state = ctx.state;
  const query = ctx.searchParams;

  let step = state.step;
  let meal = state.meal;
  let side = state.side;
  let drink = state.drink;

  let imageText = "";
  let buttons = [];

  if (step === "meal") {
    imageText = "🍔 Welcome to Wendy's!\nPick your meal:";
    buttons = [
      <Button action="post" target={{ query: { meal: "Hamburger" } }}>Hamburger</Button>,
      <Button action="post" target={{ query: { meal: "Chicken Sandwich" } }}>Chicken Sandwich</Button>,
      <Button action="post" target={{ query: { meal: "Nuggets" } }}>Nuggets</Button>,
    ];

    return {
      image: <div tw="text-center whitespace-pre">{imageText}</div>,
      buttons,
      state: {
        step: "side",
        meal: query.meal ?? meal,
      },
    };
  }

  if (step === "side") {
    imageText = `Meal: ${meal}\nPick your side 🍟:`;
    buttons = [
      <Button action="post" target={{ query: { side: "Fries" } }}>Fries</Button>,
      <Button action="post" target={{ query: { side: "Apple Slices" } }}>Apple Slices</Button>,
      <Button action="post" target={{ query: { side: "Chili" } }}>Chili</Button>,
    ];

    return {
      image: <div tw="text-center whitespace-pre">{imageText}</div>,
      buttons,
      state: {
        step: "drink",
        meal,
        side: query.side ?? side,
      },
    };
  }

  if (step === "drink") {
    imageText = `Meal: ${meal}\nSide: ${side}\nPick your drink 🥤:`;
    buttons = [
      <Button action="post" target={{ query: { drink: "Coke" } }}>Coke</Button>,
      <Button action="post" target={{ query: { drink: "Lemonade" } }}>Lemonade</Button>,
      <Button action="post" target={{ query: { drink: "Water" } }}>Water</Button>,
    ];

    return {
      image: <div tw="text-center whitespace-pre">{imageText}</div>,
      buttons,
      state: {
        step: "done",
        meal,
        side,
        drink: query.drink ?? drink,
      },
    };
  }

  // Final summary step
  if (step === "done") {
    imageText = `🧾 Your Wendy's Order:\n🍔 Meal: ${meal}\n🍟 Side: ${side}\n🥤 Drink: ${drink}\n\nThanks for ordering! ❤️`;
    buttons = [
      <Button action="post">Start Over</Button>,
    ];

    return {
      image: <div tw="text-center whitespace-pre">{imageText}</div>,
      buttons,
      state: {
        step: "meal",
      },
    };
  }

  // Fallback
  return {
    image: <div>Something went wrong. Wanna restart?</div>,
    buttons: [
      <Button action="post">Back to Start</Button>,
    ],
    state: {
      step: "meal",
    },
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
