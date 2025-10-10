"use client";

import { useState } from "react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

export function ProgressClicker() {
  const [percent, setPercent] = useState(0);

  return (
    <div className="flex flex-row items-center justify-center w-full space-x-4">
        <Button onClick={() => setPercent((prev) => prev >= 100 ? 0 : prev + 0.5)}></Button>
        <Progress value={percent} className="h-4 w-full rounded-full" />
    </div>

  );
}