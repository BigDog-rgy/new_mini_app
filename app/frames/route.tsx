/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import sceneData from "../scenes.json" assert { type: "json" };

type Scene = {
  image:   string;
  text:    string;
  options: { id: string; label: string }[];
};
const scenes: Record<string, Scene> = sceneData;

const characterImages: Record<string, string> = {
  Newt:     "https://new-mini-app-psi.vercel.app/wendys_emp_1.webp",
  Munchies: "https://new-mini-app-psi.vercel.app/wendys_emp_2.webp",
  Carly:    "https://new-mini-app-psi.vercel.app/wendys_emp_3.webp",
};

const handleRequest = frames(async (ctx) => {
  const { searchParams, state } = ctx;
  const selectedCharacter = searchParams.character ?? state.character;
  const choice            = searchParams.choice;
  const step              = state?.step ?? "pickCharacter";

  // === STEP 1: pickCharacter ===
  if (step === "pickCharacter") {
    // 1A) first load: no character yet
    if (!selectedCharacter) {
      return {
        image: "https://new-mini-app-psi.vercel.app/welcome_to_wendys.png",
        buttons: [
          <Button action="post" target={{ query: { character: "Newt" } }}>Newt</Button>,
          <Button action="post" target={{ query: { character: "Munchies" } }}>Munchies</Button>,
          <Button action="post" target={{ query: { character: "Carly" } }}>Carly</Button>,
        ],
        state: { step: "pickCharacter" },
      };
    }

    // 1B) after you pick a character but before starting the shift
    if (!choice) {
      return {
        image: characterImages[selectedCharacter]!,
        buttons: [
          <Button
            action="post"
            target={{
              query:   { character: selectedCharacter, choice: "start" }
            }}
          >
            Start Your Shift
          </Button>
        ],
        state: {
          step:      "story",
          character: selectedCharacter,
          path:      ["start"],
        },
      };
    }
  }

  // === STEP 2: story ===
  if (step === "story" && selectedCharacter && choice) {
    const sceneKey = `${selectedCharacter}_${choice}`; // e.g. "Newt_start"
    const scene    = scenes[sceneKey];

    if (!scene) {
      return {
        image: "https://dummyimage.com/1200x630/ff4444/ffffff&text=Scene+Not+Found",
        buttons: [
          <Button action="post" target={{ query: { character: "" } }}>
            Pick Character Again
          </Button>,
        ],
        state: { step: "pickCharacter" },
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
        step:      "story",
        character: selectedCharacter,
        path:      [...(state.path ?? []), choice],
      },
    };
  }

  // === FALLBACK ===
  return {
    image: "https://dummyimage.com/1200x630/000/fff&text=Something+Went+Wrong",
    buttons: [
      <Button action="post" target={{ query: { character: "" } }}>Restart</Button>
    ],
    state: { step: "pickCharacter" },
  };
});

export const GET  = handleRequest;
export const POST = handleRequest;
