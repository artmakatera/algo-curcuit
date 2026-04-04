import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

export type SwapNodeInfo = {
  element: HTMLDivElement;
  value: number;
};

export type SwapContextType = {
  parentInfo: SwapNodeInfo | null;
  childInfo: SwapNodeInfo | null;
  registerSwapParent: (el: HTMLDivElement | null, value?: number) => void;
  registerSwapChild: (el: HTMLDivElement | null, value?: number) => void;
};

const SwapContext = createContext<SwapContextType>({
  parentInfo: null,
  childInfo: null,
  registerSwapParent: () => {},
  registerSwapChild: () => {},
});

export const SwapProvider = ({ children }: { children: ReactNode }) => {
  const [parentInfo, setParentInfo] = useState<SwapNodeInfo | null>(null);
  const [childInfo, setChildInfo] = useState<SwapNodeInfo | null>(null);

  const registerSwapParent = useCallback(
    (el: HTMLDivElement | null, value?: number) =>
      setParentInfo(el && value != null ? { element: el, value } : null),
    []
  );

  const registerSwapChild = useCallback(
    (el: HTMLDivElement | null, value?: number) =>
      setChildInfo(el && value != null ? { element: el, value } : null),
    []
  );

  return (
    <SwapContext.Provider value={{ parentInfo, childInfo, registerSwapParent, registerSwapChild }}>
      {children}
    </SwapContext.Provider>
  );
};

export const useSwap = () => useContext(SwapContext);
