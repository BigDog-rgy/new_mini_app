/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import sceneData from "../scenes.json" assert { type: "json" };

// Define the scene type
type Scene = {
  image: string;
  text: string;
  options: { id: string; label: string }[];
  isEnding?: boolean;
};

const scenes: Record<string, Scene> = sceneData;

const characterImages: Record<string, string> = {
  "Newt": "https://new-mini-app-psi.vercel.app/wendys_emp_1.webp",
  "Munchies": "https://new-mini-app-psi.vercel.app/wendys_emp_2.webp",
  "Carly": "https://new-mini-app-psi.vercel.app/wendys_emp_3.webp",
};

const handleRequest = frames(async (ctx) => {
  const { searchParams, state } = ctx;
  const character = searchParams.character ?? state.character;
  const choice = searchParams.choice;
  const step = state?.step ?? "pickCharacter";
  const path = state?.path ?? [];
  const newPath = choice ? [...path, choice] : path;
  const sceneKey = `${character}_${choice ?? "start"}`;


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
          character: undefined,
          path: [],
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
      path: [...path, choice ?? "start"],  // optional: still useful for tracking
    },
    };
  }

  // === STORY SCENE ===
  if (step === "story") {
    const newPath = choice ? [...path, choice] : path;
    const sceneKey = [character, ...newPath].join("_");

    const scene = scenes[sceneKey];

    if (!scene) {
      return {
        image: "https://dummyimage.com/1200x630/ff4444/ffffff&text=Scene+Not+Found",
        buttons: [
          <Button action="post" target={{ query: { character: "" } }}>
            Restart
          </Button>,
        ],
        state: {
          step: "pickCharacter",
          character: undefined,
          path: [],
        },
      };
    }

    return {
      image: scene.image,
      buttons: scene.options.map((opt) => (
        <Button action="post" target={{ query: { choice: opt.id } }}>
          {opt.label}
        </Button>
      )),
      state: {
        step: "story",
        character,
        path: newPath,
      },
    };
  }

  // Fallback
  return {
    image: "https://dummyimage.com/1200x630/000/fff&text=Default+Fallback",
    buttons: [
      <Button action="post" target={{ query: { character: "" } }}>Reset</Button>
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