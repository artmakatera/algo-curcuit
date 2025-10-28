"use client";
import { ToggleMenu } from "@/components/ui/toggle-menu";
import { Mode, MODES } from "../model/constants";
import { useState } from "react";
import { TwoSumVisualize } from "./two-sum-visualize";







export function TwoPointersVisualize() {
    const [mode, setMode] = useState<Mode>("inward");
  

  return ( <div className="flex flex-col px-2 md:px-24 py-10">
        <ToggleMenu
          menuItems={MODES}
          value={mode}
          onValueChange={(value) => {
            setMode(value);
          }}
        />
        {
          mode === "inward" && <TwoSumVisualize />
        }
        </div>)
}