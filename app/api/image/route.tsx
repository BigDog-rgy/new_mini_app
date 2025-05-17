import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import sceneData from "./../../scenes.json" assert { type: "json" };

export const runtime = "edge";

const characterImages: Record<string, string> = {
  Newt: "/wendys_emp_1.webp",      // ✅ relative path served from /public
  Munchies: "/wendys_emp_2.webp",
  Carly: "/wendys_emp_3.webp",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sceneKey = searchParams.get("scene") ?? "default";

  // Get the scene text
  const scene = (sceneData as Record<string, { text: string }>)[sceneKey] ?? {
    text: "Scene Not Found.",
  };

  // Extract character from sceneKey (e.g. "Newt_start" → "Newt")
  const character = sceneKey.split("_")[0];
  const backgroundImage = characterImages[character] ?? "https://dummyimage.com/1200x630/111/fff&text=No+Image";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          padding: 50,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            background: "rgba(0, 0, 0, 0.6)",
            padding: "30px 40px",
            borderRadius: "16px",
            color: "white",
            fontSize: 42,
            fontFamily: "sans-serif",
            textAlign: "center",
            maxWidth: "1000px",
            lineHeight: 1.4,
          }}
        >
          {scene.text}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}