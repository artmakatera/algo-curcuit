import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

export type SwapContextType = {
  swapChildElement: HTMLDivElement | null;
  registerSwapChild: (el: HTMLDivElement | null) => void;
};

const SwapContext = createContext<SwapContextType>({
  swapChildElement: null,
  registerSwapChild: () => {},
});

export const SwapProvider = ({ children }: { children: ReactNode }) => {
  const [swapChildElement, setSwapChildElement] =
    useState<HTMLDivElement | null>(null);

  const registerSwapChild = useCallback(
    (el: HTMLDivElement | null) => setSwapChildElement(el),
    []
  );

  return (
    <SwapContext.Provider value={{ swapChildElement, registerSwapChild }}>
      {children}
    </SwapContext.Provider>
  );
};

export const useSwap = () => useContext(SwapContext);
