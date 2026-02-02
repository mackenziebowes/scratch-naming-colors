import chroma from "chroma-js";

import { colornames as allnames } from "./allcolors";
import { colornames as bestof } from "./bestof";
import { colornames as short } from "./short";
import {
  allTree,
  bestOfTree,
  shortTree,
  allKeys,
  bestOfKeys,
  shortKeys,
} from "./utils";

export function getClosestColorName(
  type: "best" | "short" | "all",
  inputHex: string,
): string {
  // Convert input to Lab space
  const targetPoint = chroma(inputHex).lab();
  if (type == "all") {
    // tree.nn returns the index of the nearest point
    const nearestIndex = allTree.nn(targetPoint);

    if (nearestIndex === -1) return "Unknown";

    const hexMatch = allKeys[nearestIndex];
    return allnames[hexMatch];
  }
  if (type == "short") {
    // tree.nn returns the index of the nearest point
    const nearestIndex = shortTree.nn(targetPoint);

    if (nearestIndex === -1) return "Unknown";

    const hexMatch = shortKeys[nearestIndex];
    return short[hexMatch];
  }
  if (type == "best") {
    // tree.nn returns the index of the nearest point
    const nearestIndex = bestOfTree.nn(targetPoint);

    if (nearestIndex === -1) return "Unknown";

    const hexMatch = bestOfKeys[nearestIndex];
    return bestof[hexMatch];
  }
  return "";
}

// const intToHex = (integer: number) => {
//   switch (integer) {
//     case 10:
//       return "A";
//     case 11:
//       return "B";
//     case 12:
//       return "C";
//     case 13:
//       return "D";
//     case 14:
//       return "E";
//     case 15:
//       return "F";
//     default:
//       return `${integer}`;
//   }
// };

// const constructName = (args: {
//   red: string;
//   green: string;
//   blue: string;
//   i: number;
//   j: number;
//   m: number;
// }) => {
//   return `#${args.red}${args.i}${args.green}${args.j}${args.blue}${args.m}`;
// };

// const findName = (color: string) => {
//   const red = color.charAt(1);
//   const green = color.charAt(3);
//   const blue = color.charAt(5);
//   for (let i = 0; i < 16; i++) {
//     for (let j = 0; j < 16; j++) {
//       for (let m = 0; m < 16; m++) {
//         console.log({ i, j, m });
//         const currentColor = colornames[
//           constructName({ red, green, blue, i, j, m })
//         ] as string | undefined;
//         if (currentColor) return currentColor;
//       }
//     }
//   }
//   return undefined;
// };

export default function ColorNamer(args: { currentColor: string }) {
  const specific = getClosestColorName("all", args.currentColor);
  const best = getClosestColorName("best", args.currentColor);
  const short = getClosestColorName("short", args.currentColor);
  return (
    <div className="flex flex-col gap-2">
      <p>All:</p>
      <p className="text-3xl font-black" style={{ color: args.currentColor }}>
        {specific}
      </p>
      <p>Best of:</p>
      <p className="text-3xl font-black" style={{ color: args.currentColor }}>
        {best}
      </p>
      <p>Short:</p>
      <p className="text-3xl font-black" style={{ color: args.currentColor }}>
        {short}
      </p>
    </div>
  );
}
