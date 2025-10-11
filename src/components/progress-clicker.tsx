"use client";

import { useState } from "react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

export function ProgressClicker() {
  const [percent, setPercent] = useState(0);
  const [isSaveClicked, setIsSaveClicked] = useState(false);

  const handleClick = () => {
    const newPercent = percent + 0.5;
    if (newPercent >= 100) {
      setPercent(0);
      setIsSaveClicked(true);
      setTimeout(() => {
        setIsSaveClicked(false);
      }, 1000);
    } else {
      setPercent(newPercent);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center w-full space-x-4">
      <Button
        onClick={handleClick}
        className="transform active:scale-125 transition-transform"
      ></Button>
      <Progress value={percent} className="h-4 w-full rounded-full" />
    </div>


  );
}