import { fetchMetadata } from "frames.js/next";
 
export async function generateMetadata() {
  return {
    title: "My Page",
    // ...
    other: {
      // ...
      ...(await fetchMetadata(
        // provide a full URL to your /frames endpoint
        new URL(
          "/frames",
          "https://new-mini-app-psi.vercel.app"
        )
      )),
    },
  };
}
 
export default function Page() {
  return <span>My existing page</span>;
}