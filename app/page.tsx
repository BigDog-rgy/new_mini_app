export const metadata = {
  title: "Mini Poll Frame",
  description: "A Farcaster Frame powered by frames.js",
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://new-mini-app-psi.vercel.app/wendysStorefront.webp",
    "fc:frame:image:aspect_ratio": "1.91:1",
    "fc:frame:button:1": "Welcome to Wendy's!",
    "fc:frame:button:1:action": "post",
    "fc:frame:button:1:target": "https://new-mini-app-psi.vercel.app/frames"
  }
};

export default function Page() {
  return (
    <main style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Mini Poll Frame</h1>
      <p>This is a minimal Warpcast frame. Click the button to launch.</p>
    </main>
  );
}
