import { TreeNode } from "@/widgets/binary-tree/model/binary-tree";
import {
  createContext,
  RefObject,
  ReactNode,
  useState,
  useContext,
  useRef,
} from "react";

export type NodeToRemoveContextType = {
  nodeToRemove: RefObject<HTMLDivElement>;
  setNodeToRemove: (ref: RefObject<HTMLDivElement>) => void;
};
const NodeToRemoveContext = createContext<NodeToRemoveContextType>({
  nodeToRemove: { current: null },
  setNodeToRemove: () => {},
});

export const NodeToRemoveProvider = ({
  children,
}: {
  children: ReactNode;
  nodeToRemove?: TreeNode | null;
}) => {
  const removeRef = useRef<HTMLDivElement | null>(null);

  const setNodeToRemove = (ref: RefObject<HTMLDivElement>) => {
    if (ref.current) {
      removeRef.current = ref.current;
    }
  };

  return (
    <NodeToRemoveContext.Provider
      value={{
        nodeToRemove: removeRef,
        setNodeToRemove,
      }}
    >
      {children}
    </NodeToRemoveContext.Provider>
  );
};

export const useNodeToRemove = () => useContext(NodeToRemoveContext);
