"use client";

import { useState } from "react";
import ColourRandomizer from "./ColourRandomizer";
import ColourNamer from "./ColourNamer";

export default function Controller() {
  const [currentColor, setCurrentColor] = useState<string>("#000000");

  return (
    <div className="flex flex-col gap-2 p-4">
      <ColourRandomizer
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
      />
      <ColourNamer currentColor={currentColor} />
    </div>
  );
}
