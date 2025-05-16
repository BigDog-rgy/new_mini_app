/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import sceneData from "../scenes.json" assert { type: "json" };

type SceneOption = { id: string; label: string; next?: string };
type Scene = {
  image:   string;
  text:    string;
  options?: SceneOption[];
  isEnding?: boolean;
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
  const step              = state?.step ?? "pickCharacter";
  const choice            = searchParams.choice;
  const nextSceneKey      = searchParams.next;

  // === PICK CHARACTER ===
  if (step === "pickCharacter") {
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

    // After picking, allow "Start Your Shift"
    return {
      image: characterImages[selectedCharacter]!,
      buttons: [
        <Button action="post" target={{ query: { character: selectedCharacter, choice: "start" } }}>
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

  // === STORY ===
  if (step === "story" && selectedCharacter) {
    // 1) Resolve sceneKey (explicit next, or default to character_choice)
    let sceneKey = "";
    if (nextSceneKey) {
      sceneKey = nextSceneKey;
    } else if (choice) {
      sceneKey = `${selectedCharacter}_${choice}`;
    } else {
      // Fallback if no choice
      return {
        image: "https://dummyimage.com/1200x630/000/fff&text=No+Scene+Key",
        buttons: [
          <Button action="post" target={{ query: { character: "" } }}>Pick New Employee</Button>
        ],
        state: { step: "pickCharacter" }
      };
    }

    const scene = scenes[sceneKey];
    if (!scene) {
      return {
        image: "https://dummyimage.com/1200x630/ff4444/ffffff&text=Scene+Not+Found",
        buttons: [
          <Button action="post" target={{ query: { character: "" } }}>Pick New Employee</Button>
        ],
        state: { step: "pickCharacter" }
      };
    }

    // 2) Handle endings (no options or isEnding true)
    if (!scene.options || scene.options.length === 0 || scene.isEnding) {
      return {
        image: scene.image,
        text: scene.text,
        buttons: [
          <Button action="post" target={{ query: { character: "" } }}>Pick New Employee</Button>
        ],
        state: { step: "pickCharacter" }
      };
    }

    // 3) Regular branching scene
    return {
      image: "https://new-mini-app-psi.vercel.app/api/image?scene=${sceneKey}",
      text: scene.text,
      buttons: scene.options.map((opt) =>
        <Button
          action="post"
          target={
            opt.next
              ? { query: { next: opt.next, character: selectedCharacter } }
              : { query: { choice: opt.id, character: selectedCharacter } }
          }
        >
          {opt.label}
        </Button>
      ),
      state: {
        step:      "story",
        character: selectedCharacter,
        path:      [...(state.path ?? []), sceneKey],
      }
    };
  }

  // === FALLBACK ===
  return {
    image: "https://dummyimage.com/1200x630/000/fff&text=Something+Went+Wrong",
    buttons: [
      <Button action="post" target={{ query: { character: "" } }}>Restart</Button>
    ],
    state: { step: "pickCharacter" }
  };
});

export const GET  = handleRequest;
export const POST = handleRequest;
