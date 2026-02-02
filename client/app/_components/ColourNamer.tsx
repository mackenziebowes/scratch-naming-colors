// @ts-expect-error - static-kdtree doesn't provide types, but the API is simple
import createKDTree from "static-kdtree";
import chroma from "chroma-js";

import { colornames, colorKeys, colorTree } from "./colornames";

export function getClosestColorName(inputHex: string): string {
  // Convert input to Lab space
  const targetPoint = chroma(inputHex).lab();

  // tree.nn returns the index of the nearest point
  const nearestIndex = colorTree.nn(targetPoint);

  if (nearestIndex === -1) return "Unknown";

  const hexMatch = colorKeys[nearestIndex];
  return colornames[hexMatch];
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
  const currentColor = getClosestColorName(args.currentColor ?? "#000000");

  return (
    <p className="text-4xl font-black" style={{ color: args.currentColor }}>
      {currentColor}
    </p>
  );
}
