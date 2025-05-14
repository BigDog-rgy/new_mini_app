/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

const handleRequest = frames(async (ctx) => {
  const { searchParams, state } = ctx;
  const raw = searchParams.value;               // last-clicked value
  const step = state?.step ?? "entree";         // default to entrée

  // pull existing selections
  let entree = state.entree;
  let side   = state.side;
  let drink  = state.drink;

  // short-circuit “Start Over” if user clicks it
  if (raw === "start_over") {
    return {
      image: (
        <div tw="text-center whitespace-pre-wrap">
          🍔 Welcome to Wendy’s!  
          Choose your entrée:
        </div>
      ),
      buttons: [
        <Button action="post" target={{ query: { value: "Dave's Single" } }}>
          Dave's Single
        </Button>,
        <Button action="post" target={{ query: { value: "Spicy Chicken Sandwich" } }}>
          Spicy Chicken Sandwich
        </Button>,
        <Button action="post" target={{ query: { value: "10pc Nuggets" } }}>
          10pc Nuggets
        </Button>,
      ],
      state: { step: "entree" },
    };
  }

  let imageText = "";
  let buttons: JSX.Element[] = [];
  let nextStep: "entree" | "side" | "drink" | "done" = step;


  if (step === "entree") {
    // when they pick their entrée
    if (raw) {
      entree = raw;
      nextStep = "side";
      imageText = `🔥 You chose the ${raw}!\nPick a side:`;
    } else {
      imageText = `🍔 Welcome to Wendy’s!\nChoose your entrée:`;
    }
    buttons = [
      <Button action="post" target={{ query: { value: "Dave's Single" } }}>
        Dave's Single
      </Button>,
      <Button action="post" target={{ query: { value: "Spicy Chicken Sandwich" } }}>
        Spicy Chicken Sandwich
      </Button>,
      <Button action="post" target={{ query: { value: "10pc Nuggets" } }}>
        10pc Nuggets
      </Button>,
    ];

  } else if (step === "side") {
    if (raw) {
      side = raw;
      nextStep = "drink";
      imageText = `🍟 Side locked in: ${raw}!\nNow pick your drink:`;
    } else {
      imageText = `🍟 Choose your side:`;
    }
    buttons = [
      <Button action="post" target={{ query: { value: "Fries" } }}>Fries</Button>,
      <Button action="post" target={{ query: { value: "Baconator Fries" } }}>
        Baconator Fries
      </Button>,
      <Button action="post" target={{ query: { value: "Chili" } }}>Chili</Button>,
    ];

  } else if (step === "drink") {
    if (raw) {
      drink = raw;
      nextStep = "done";
      imageText = `🥤 You picked ${raw}.\nHere’s your full order:`;
    } else {
      imageText = `🥤 Choose your drink:`;
    }
    buttons = [
      <Button action="post" target={{ query: { value: "Coke" } }}>Coke</Button>,
      <Button action="post" target={{ query: { value: "Strawberry Lemonade" } }}>
        Strawberry Lemonade
      </Button>,
      <Button action="post" target={{ query: { value: "Vanilla Frosty" } }}>
        Vanilla Frosty
      </Button>,
    ];

  } else if (step === "done") {
  // if they clicked “Start Over”, reset to entree
  if (raw === "start_over") {
    nextStep = "entree";
    entree = side = drink = undefined;
  }
  imageText = `✅ Your order:\n🍔 ${entree}\n🍟 ${side}\n🥤 ${drink}`;
  buttons = [
    <Button action="post" target={{ query: { value: "start_over" } }}>
      Start Over
    </Button>,
  ];
}

  return {
    image: <div tw="text-center whitespace-pre-wrap">{imageText}</div>,
    buttons,
    state: {
      step:  nextStep,
      entree,
      side,
      drink,
    },
  };
});

export const GET  = handleRequest;
export const POST = handleRequest;
