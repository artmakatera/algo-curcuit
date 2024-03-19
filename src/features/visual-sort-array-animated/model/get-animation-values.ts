const size = 48;

const defaultAnimateValues = {
  x: 0,
  y: 0,
  duration: 0,
};

const getSiblingPosition = (
  ref: React.RefObject<HTMLDivElement>,
  prev: boolean
) => {
  if (!ref.current) return defaultAnimateValues;

  let sibling = ref.current.nextSibling as HTMLDivElement | null;
  if (prev) {
    sibling = ref.current.previousSibling as HTMLDivElement | null;
  }

  if (!sibling) {
    return defaultAnimateValues;
  }

  const rect = ref.current.getBoundingClientRect();
  const siblingRect = sibling.getBoundingClientRect();

  const targetX = siblingRect.left - rect.left;
  const targetY = siblingRect.top - rect.top;
  const deltaY = prev ? -size : size;

  return {
    x: [0, targetX, targetX],
    y: [deltaY, targetY + deltaY, targetY],
  };
};

export const getAnimateValues = (
  ref: React.RefObject<HTMLDivElement>,
  isGoBack: boolean,
  isGoForward: boolean
) => {
  if (!ref.current) return defaultAnimateValues;
  if (!isGoBack && !isGoForward) return defaultAnimateValues;

  if (isGoBack) {
    return getSiblingPosition(ref, true);
  }

  return getSiblingPosition(ref, false);
};

export const getTransition = (isGoBack: boolean, isGoForward: boolean) => {
  if (isGoBack || isGoForward) {
    return { type: "linear", duration: 0.7 };
  }

  return { duration: 0, type: "linear" };
}