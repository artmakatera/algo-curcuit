"use client";

import { AnimatedArrayItem } from "./animated-array-item";
import { MergeArrayWrapper } from "./merge-array-wrapper";
import { MergeSubArrayWrapper } from "./merge-subarray-wrapper";
import { useState } from "react";

const getInitialAnimationProps = (isEnabled: boolean) => {
  console.log("isEnabled", isEnabled);
  if (!isEnabled) {
    return {};
  }

  return {
    initial: {
      width: 0,
    },
    animate: {
      width: "3rem",
    },
  };
};

export const MergeArray = () => {
  const [array, setArray] = useState<number[][]>([
    [2, 12],
    [22, 121],
  ]);

  return (
    <div>
      <MergeArrayWrapper>
        {array.map((subArray, index) => (
          <MergeSubArrayWrapper
            key={index}
            {...getInitialAnimationProps(subArray.length === 0)}
          >
            {subArray.map((value, index) => (
              <AnimatedArrayItem
                key={index}
                value={value}
                index={index}
                className="bg-background"
              />
            ))}
          </MergeSubArrayWrapper>
        ))}
      </MergeArrayWrapper>
      <button
        className="bg-primary text-white px-4 py-2 rounded-md"
        type="button"
        onClick={() => setArray((arr) => arr.concat([[]]))}
      >
        Update
      </button>
    </div>
  );
};

