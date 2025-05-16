/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

const characterImages: Record<string, string> = {
  "Newt": "https://new-mini-app-psi.vercel.app/wendys_emp_1.webp",
  "Munchies": "https://new-mini-app-psi.vercel.app/wendys_emp_2.webp",
  "Carly": "https://new-mini-app-psi.vercel.app/wendys_emp_3.webp",
};

const handleRequest = frames(async (ctx) => {
  const { searchParams, state } = ctx;

  const character = searchParams.character !== undefined
    ? searchParams.character
    : state.character;

  const choice = searchParams.choice;
  const step = state?.step ?? "pickCharacter";
  const path = state?.path ?? [];

  // === STEP: PICK CHARACTER ===
  if (step === "pickCharacter") {
    if (!character) {
      return {
        image: "https://new-mini-app-psi.vercel.app/welcome_to_wendys.png",
        buttons: [
          <Button action="post" target={{ query: { character: "Newt" } }}>Newt</Button>,
          <Button action="post" target={{ query: { character: "Munchies" } }}>Munchies</Button>,
          <Button action="post" target={{ query: { character: "Carly" } }}>Carly</Button>,
        ],
        state: {
          step: "pickCharacter",
          path,
          character: undefined,
        },
      };
    }

    return {
      image: characterImages[character] ?? "https://new-mini-app-psi.vercel.app/welcome_to_wendys.png",
      buttons: [
        <Button action="post" target={{ query: { choice: "start_shift" } }}>
          Start Your Shift
        </Button>,
        <Button action="post" target={{ query: { character: "" } }}>
          Pick Again
        </Button>,
      ],
      state: {
        step: "story",
        character,
        path: [],
      },
    };
  }

  // === STEP: STORY SCENE ===
  if (step === "story") {
    const newPath = choice ? [...path, choice] : path;

    // Simple 1st scene hardcoded for now
    const isFirstScene = newPath.length === 0;
    const isAfterFirstChoice = newPath.length === 1;

    if (isFirstScene) {
  // Dummy scene logic based on character
  let image = "";
  let text = "";
  let buttons = [];

  if (character === "Newt") {
    image = "https://new-mini-app-psi.vercel.app/scene_newt_1.webp";
    text = "Newt nervously wipes down the counter. A group of teens walks in laughing.";
    buttons = [
      <Button action="post" target={{ query: { choice: "GreetQuietly" } }}>
        Greet them quietly
      </Button>,
      <Button action="post" target={{ query: { choice: "HideInFreezer" } }}>
        Hide in the freezer
      </Button>,
    ];
  } else if (character === "Munchies") {
    image = "https://new-mini-app-psi.vercel.app/scene_munchies_1.webp";
    text = "Munchies sighs, clocking in late again. A drive-thru order barks through the headset.";
    buttons = [
      <Button action="post" target={{ query: { choice: "YellBack" } }}>
        Yell back at them
      </Button>,
      <Button action="post" target={{ query: { choice: "IgnoreIt" } }}>
        Ignore it completely
      </Button>,
    ];
  } else if (character === "Carly") {
    image = "https://new-mini-app-psi.vercel.app/scene_carly_1.webp";
    text = "Carly bursts into the kitchen, smiling too wide. 'We're gonna crush this lunch rush!' she shouts.";
    buttons = [
      <Button action="post" target={{ query: { choice: "StartRanting" } }}>
        Start ranting about motivation
      </Button>,
      <Button action="post" target={{ query: { choice: "TryToOrganize" } }}>
        Try to organize the fry station
      </Button>,
    ];
  } else {
    // Just in case character is invalid
    image = "https://new-mini-app-psi.vercel.app/welcome_to_wendys.png";
    text = "Something broke. Try again.";
    buttons = [
      <Button action="post" target={{ query: { character: "" } }}>
        Reset
      </Button>,
    ];
  }

  return {
    image,
    buttons,
    state: {
      step: "story",
      character,
      path: newPath,
    },
  };
}

    if (isAfterFirstChoice) {
      const previousChoice = newPath[0];
      return {
        image: "https://new-mini-app-psi.vercel.app/scene_2.webp", // placeholder
        buttons: [
          <Button action="post" target={{ query: { choice: "Commit" } }}>
            Double down
          </Button>,
          <Button action="post" target={{ query: { choice: "Apologize" } }}>
            Apologize
          </Button>,
        ],
        state: {
          step: "story",
          character,
          path: newPath,
        },
      };
    }

    // fallback once choices exceed 2 (pretend it’s the end)
    return {
      image: "https://new-mini-app-psi.vercel.app/ending_default.webp",
      buttons: [
        <Button action="post" target={{ query: { character: "" } }}>
          Start Over
        </Button>,
      ],
      state: {
        step: "pickCharacter",
        character: undefined,
        path: [],
      },
    };
  }

  // fallback default
  return {
    image: "https://new-mini-app-psi.vercel.app/welcome_to_wendys.png",
    buttons: [
      <Button action="post" target={{ query: { character: "" } }}>
        Reset
      </Button>,
    ],
    state: {
      step: "pickCharacter",
      character: undefined,
      path: [],
    },
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
