import { useEffect, useState } from "react";
import { getCurrentAnimation } from "./helpers";


export function useAnimationVariant( isMoving?: boolean, isGoBack?: boolean) {
    const [animationVariant, setAnimationVariant] = useState("default");
  
    useEffect(() => {
      setAnimationVariant(getCurrentAnimation(!!isMoving, isGoBack));
    }, [isMoving, isGoBack]);

    return animationVariant;
}