/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import sceneData from "../scenes.json" assert { type: "json" };

type SceneOption = { id: string; label?: string; next?: string };
type Scene = {
  image: string;
  options?: SceneOption[];
  isEnding?: boolean;
};
const scenes: Record<string, Scene> = sceneData;

const characterImages: Record<string, string> = {
  Newt: "https://new-mini-app-psi.vercel.app/wendys_emp_1.webp",
  Munchies: "https://new-mini-app-psi.vercel.app/wendys_emp_2.webp",
  Carly: "https://new-mini-app-psi.vercel.app/wendys_emp_3.webp",
};

const handleRequest = frames(async (ctx) => {
  const { searchParams, state } = ctx;
  const selectedCharacter = searchParams.character ?? state.character;
  const step = state?.step ?? "pickCharacter";
  const choice = searchParams.choice;
  const nextSceneKey = searchParams.next;

  // Dynamically determine origin (https://your-app.vercel.app)
  const baseUrl = new URL(ctx.url).origin;

  // === PICK CHARACTER ===
  if (step === "pickCharacter") {
    if (!selectedCharacter) {
      return {
        image: `${baseUrl}/welcome_to_wendys.png`,
        buttons: [
          <Button action="post" target={{ query: { character: "Newt" } }}>Newt</Button>,
          <Button action="post" target={{ query: { character: "Munchies" } }}>Munchies</Button>,
          <Button action="post" target={{ query: { character: "Carly" } }}>Carly</Button>,
        ],
        state: { step: "pickCharacter" },
      };
    }

    return {
      image: characterImages[selectedCharacter]!,
      buttons: [
        <Button action="post" target={{ query: { character: selectedCharacter, next: "StartShift" } }}>
          Start Your Shift
        </Button>
      ],
      state: {
        step: "story",
        character: selectedCharacter,
        path: ["start"],
      },
    };
  }

  // === STORY ===
  if (step === "story" && selectedCharacter) {
    let sceneKey = "";
    if (nextSceneKey) {
      sceneKey = nextSceneKey;
    } else if (choice) {
      sceneKey = Object.prototype.hasOwnProperty.call(scenes, choice)
        ? choice
        : `${selectedCharacter}_${choice}`;
    } else {
      return {
        image: "https://dummyimage.com/1200x630/000/fff&text=No+Scene+Key",
        buttons: [
          <Button action="post" target={{ query: { character: "" } }}>Pick New Employee</Button>
        ],
        state: { step: "pickCharacter" }
      };
    }

    const scene = scenes[sceneKey];
    console.log("Scene key:", sceneKey);
    console.log("Scene image:", scene?.image);

    if (!scene) {
      return {
        image: "https://dummyimage.com/1200x630/ff4444/ffffff&text=Scene+Not+Found",
        buttons: [
          <Button action="post" target={{ query: { character: "" } }}>Pick New Employee</Button>
        ],
        state: { step: "pickCharacter" }
      };
    }

    const fullImageUrl = scene.image.startsWith("http")
      ? scene.image
      : `${baseUrl}${scene.image}`;

    if (!scene.options || scene.options.length === 0 || scene.isEnding) {
      return {
        image: fullImageUrl,
        buttons: [
          <Button action="post" target={{ query: { character: "" } }}>Pick New Employee</Button>
        ],
        state: { step: "pickCharacter" }
      };
    }

    return {
      image: fullImageUrl,
      buttons: scene.options.map((opt) =>
        <Button
          action="post"
          target={
            opt.next
              ? { query: { next: opt.next, character: selectedCharacter } }
              : { query: { choice: opt.id, character: selectedCharacter } }
          }
        >
          {opt.label ?? "Continue"}
        </Button>
      ),
      state: {
        step: "story",
        character: selectedCharacter,
        path: [...(state.path ?? []), sceneKey],
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

export const GET = handleRequest;
export const POST = handleRequest;
