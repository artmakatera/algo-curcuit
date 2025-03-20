import { MERGE_ARRAYS_WRAPPER_ID, TARGET_SUB_ARRAY_ID } from "./constants";

export const getBoundingRect = (element?: HTMLDivElement | null) => {
  if (!element) {
    return null;
  }

  return element.getBoundingClientRect();
};


export const getTargetSubArrayElement = (ref?: React.RefObject<HTMLDivElement | null>) => {
  if (!ref?.current) {
    return null;
  }

  const arrayWrapper = ref.current.closest(`#${MERGE_ARRAYS_WRAPPER_ID}`);

  return arrayWrapper?.querySelector(`#${TARGET_SUB_ARRAY_ID}`) as HTMLDivElement;

}

export function getCurrentAnimation(isMoving: boolean, isGoBack?: boolean) {
  if (!isMoving) {
    return "default";
  }

  if (isGoBack) {
    return "moveBackward";
  }

  return "moveForward";
}