/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames, StoryState } from "./frames";

const handleRequest = frames(async (ctx) => {
  const { searchParams, state } = ctx;
  const choice = searchParams.choice;         // query param “choice”
  const { step, character = "", path = [] } = state;

  let nextState = { ...state };
  let image: JSX.Element;
  let buttons: JSX.Element[];

  // 1) CHARACTER SELECTION
  if (step === "pickCharacter") {
    if (choice) {
      nextState.character = choice;
      nextState.step = "choice1";
    }
    image = <div tw="text-center">\n👋 Choose your character:</div>;
    buttons = [
      <Button action="post" target={{ query: { choice: "Newbie Cashier" } }}>
        Newbie Cashier
      </Button>,
      <Button action="post" target={{ query: { choice: "Veteran Fry Cook" } }}>
        Veteran Fry Cook
      </Button>,
      <Button action="post" target={{ query: { choice: "Shift Manager" } }}>
        Shift Manager
      </Button>,
    ];

  // 2) FORK 1
  } else if (step === "choice1") {
    if (choice) {
      nextState.path = [...path, choice];
      nextState.step = "choice2";
    }
    image = (
      <div tw="text-center whitespace-pre-wrap">
        {`🏭 You’re ${character} on your first shift.\n` +
         `A customer spills their drink. Do you:`}
      </div>
    );
    buttons = [
      <Button action="post" target={{ query: { choice: "CleanIt" } }}>
        Clean it up yourself
      </Button>,
      <Button action="post" target={{ query: { choice: "CallBackup" } }}>
        Call a teammate
      </Button>,
      <Button action="post" target={{ query: { choice: "IgnoreIt" } }}>
        Pretend you didn’t see it
      </Button>,
    ];

  // 3) FORK 2
  } else if (step === "choice2") {
    if (choice) {
      nextState.path = [...path, choice];
      nextState.step = "choice3";
    }
    // You can customize the dialog per the first choice:
    const prev1 = path[0];
    const prompt = prev1 === "CleanIt"
      ? "The manager notices your elbow grease. Do you:"
      : prev1 === "CallBackup"
      ? "Your teammate arrives. Do you:"
      : "The spill grows. Do you:";

    image = <div tw="text-center whitespace-pre-wrap">{prompt}</div>;
    buttons = [
      <Button action="post" target={{ query: { choice: "OptionA" } }}>
        Option A
      </Button>,
      <Button action="post" target={{ query: { choice: "OptionB" } }}>
        Option B
      </Button>,
      <Button action="post" target={{ query: { choice: "OptionC" } }}>
        Option C
      </Button>,
    ];

  // 4) FORK 3
  } else if (step === "choice3") {
    if (choice) {
      nextState.path = [...path, choice];
      nextState.step = "ending";
    }
    image = <div tw="text-center">✨ Third twist: what’s your move?</div>;
    buttons = [
      <Button action="post" target={{ query: { choice: "Alpha" } }}>
        Alpha
      </Button>,
      <Button action="post" target={{ query: { choice: "Bravo" } }}>
        Bravo
      </Button>,
      <Button action="post" target={{ query: { choice: "Charlie" } }}>
        Charlie
      </Button>,
    ];

  // 5) ENDING
  } else {
    // build an ending based on character + path array
    const endingKey = [character, ...path].join("-");
    image = (
      <div tw="text-center whitespace-pre-wrap">
        {`🎉 Ending: ${endingKey}\n` +
         `Your adventure is one of ${path.length} branch points.\n` +
         `Thanks for playing, ${character}!`}
      </div>
    );
    buttons = [
      <Button action="post" target={{ query: { choice: "Restart" } }}>
        Play Again
      </Button>,
    ];
    nextState = {
      step: "pickCharacter",
      character: undefined,
      path: [],
    };
  }

  return {
    image,
    buttons,
    state: nextState as StoryState,
  };
});

export const GET  = handleRequest;
export const POST = handleRequest;
