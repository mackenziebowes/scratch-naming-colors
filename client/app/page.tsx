import Image from "next/image";

import Controller from "./_components/Controller";

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-center h-svh w-svh">
      <div className="flex flex-col items-center justify-center">
        <Controller />
      </div>
    </div>
  );
}
