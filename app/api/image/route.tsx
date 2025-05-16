// app/api/image/route.tsx
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import sceneData from "./../../scenes.json" assert { type: "json" };

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sceneKey = searchParams.get("scene") ?? "default";
  const scene = (sceneData as Record<string, { text: string }>)[sceneKey] ?? {
  text: "Scene Not Found.",
};

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          fontSize: "48px",
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        {scene.text}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
