/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
 
const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <span>
        {ctx.pressedButton
          ? `I clicked ${ctx.searchParams.value}`
          : `Click some button`}
      </span>
    ),
    buttons: [
      <Button action="post" target={{ query: { value: "Hamburger" } }}>
        I'd Like a Hamburger
      </Button>,
      <Button action="post" target={{ query: { value: "Chicken" } }}>
        I'd Like a Chicken Sandwich
      </Button>,
      <Button action="post" target={{ query: { value: "Fries" } }}>
        I'd Like Fries
      </Button>,
    ],
  };
});
 
export const GET = handleRequest;
export const POST = handleRequest;