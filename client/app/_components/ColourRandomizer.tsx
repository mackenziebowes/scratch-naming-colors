"use client";
import chroma from "chroma-js";
import { type Dispatch, type SetStateAction } from "react";
import { useState } from "react";

export default function ColourRandomizer(args: {
  currentColor: string;
  setCurrentColor: Dispatch<SetStateAction<string>>;
}) {
  const [previousColors, setPreviousColors] = useState<string[]>([]);
  const [topColor, setTopColor] = useState<string>("");
  const [bottomColor, setBottomColor] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  const makeRandomColor = () => {
    const newColor = chroma.random().hex();
    return newColor;
  };

  const generateNewColor = () => {
    const newColor = makeRandomColor();
    args.setCurrentColor(newColor);
    setPreviousColors((v) => {
      return [...v.slice(-4), newColor];
    });
    setIndex(previousColors.length - 1);
    makeOtherColors(newColor);
  };

  const decrementIndex = () => {
    if (index - 1 == 0) {
      setIndex(previousColors.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  const incrementIndex = () => {
    if (index + 1 >= previousColors.length) {
      setIndex(0);
    } else {
      setIndex(previousColors.length - 1);
    }
  };

  const previousColor = () => {
    decrementIndex();
    args.setCurrentColor(previousColors[index]!);
    makeOtherColors();
  };

  const nextColor = () => {
    incrementIndex();
    args.setCurrentColor(previousColors[index]!);
    makeOtherColors();
  };

  const makeOtherColors = (color?: string) => {
    const oldColor = color ?? args.currentColor;
    const red10s = oldColor.charAt(1);
    const green10s = oldColor.charAt(3);
    const blue10s = oldColor.charAt(5);
    setTopColor(`#${red10s}F${green10s}F${blue10s}F`);
    setBottomColor(`#${red10s}0${green10s}0${blue10s}0`);
    console.log({ red10s, green10s, blue10s });
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <div
              className="h-12 aspect-square"
              style={{ backgroundColor: topColor }}
            />
            <p className="px-4 py-2">{topColor}</p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div
              className="h-12 aspect-square"
              style={{ backgroundColor: args.currentColor }}
            />
            <input
              type="text"
              value={args.currentColor}
              onChange={(e) => args.setCurrentColor(e.target.value)}
              className="px-4 py-2 border-neutral-500 border-2"
            />
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div
              className="h-12 aspect-square"
              style={{ backgroundColor: bottomColor }}
            />
            <p className="px-4 py-2">{bottomColor}</p>
          </div>
        </div>

        <button onClick={() => previousColor()}>Previous</button>
        <button onClick={() => nextColor()}>Next</button>
        <div className="h-4 aspect-square" />
        <button onClick={() => generateNewColor()}>New Color</button>
      </div>
    </div>
  );
}
