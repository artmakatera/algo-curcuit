const size = 48;

const defaultAnimateValues = {
  x: 0,
  y: 0,
  duration: 0,
};

const getSiblingPosition = (
  element: HTMLDivElement | null,
  elementToSwap: HTMLDivElement | null,
  prev: boolean
) => {
  if (!element) return defaultAnimateValues;

  let sibling = elementToSwap;

  if (!sibling) {
    return defaultAnimateValues;
  }

  const rect = element.getBoundingClientRect();
  const siblingRect = sibling.getBoundingClientRect();

  const targetX = siblingRect.left - rect.left;
  const targetY = siblingRect.top - rect.top;
  const deltaY = prev ? -size : size;

  return {
    x: [0, targetX, targetX],
    y: [deltaY, targetY + deltaY, targetY],
  };
};

export const getAnimateValues = ({
  element,
  elementToSwap,
  isGoBack,
  isGoForward,
} :
 { element: HTMLDivElement | null,
  elementToSwap: HTMLDivElement | null,
  isGoBack: boolean,
  isGoForward: boolean}
) => {
  if (!element || !elementToSwap) return defaultAnimateValues;
  if (!isGoBack && !isGoForward) return defaultAnimateValues;

  if (isGoBack) {
    return getSiblingPosition(element, elementToSwap, true);
  }

  return getSiblingPosition(element, elementToSwap, false);
};

export const getTransition = (isGoBack: boolean, isGoForward: boolean) => {
  if (isGoBack || isGoForward) {
    return { type: "linear", duration: 0.7 };
  }

  return { duration: 0, type: "linear" };
}