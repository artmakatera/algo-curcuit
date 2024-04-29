"use client";
import { createPortal } from "react-dom";
import { cn } from "@/shared/lib/utils";
import { ForwardedRef, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type LeafRef = ForwardedRef<HTMLDivElement>;

type LineProps = {
  isLeft?: boolean;
  childRef: LeafRef;
  parentRef?: LeafRef;
};

const getWidth = (left: DOMRect, right: DOMRect) => {
  return right.left + right.width / 2 - (left.left + left.width / 2);
};

const getHeight = (parent: DOMRect, child: DOMRect) => {
  return child.top - parent.top;
};

const getLeft = (domRect: DOMRect) => domRect.left + domRect.width / 2;

const getStyle = (
  parentRef?: LeafRef,
  childRef?: LeafRef,
  isLeft?: boolean
) => {
  if (!childRef || !parentRef) return null;
  if (typeof childRef === "function" || typeof parentRef === "function")
    return null;

  const parent = parentRef.current?.getBoundingClientRect();
  const child = childRef.current?.getBoundingClientRect();

  if (!parent || !child) return null;

  return {
    top: parent.top + parent.height / 2,
    left: getLeft(isLeft ? child : parent),
    width: isLeft ? getWidth(child, parent) : getWidth(parent, child),
    height: getHeight(parent, child),
  };
};

export const Line = ({ isLeft, childRef, parentRef }: LineProps) => {
  const style = getStyle(parentRef, childRef, isLeft);
  const [show, setShow] = useState(false);
  const durationRef = useRef(1);

  useLayoutEffect(() => {
    setShow(true);

    const onResize = async () => {
      durationRef.current = 0;
      setShow(false);
      await Promise.resolve();
      setShow(true);
      durationRef.current = 1;
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [style]);

  if (style === null || !show) {
    return null;
  }

  return createPortal(
    <div className={cn("absolute -z-10")} style={style}>
      <svg className="w-full h-full">
        <motion.line
          initial={{ x2: 0, y2: isLeft ? "100%" : 0 }}
          animate={{ x2: "100%", y2: isLeft ? 0 : "100%" }}
          transition={{ type: "linear", duration: durationRef.current }}
          x1={0}
          x2={"100%"}
          y1={isLeft ? "100%" : 0}
          y2={isLeft ? 0 : "100%"}
          className="stroke-black dark:stroke-white"
          strokeWidth="1"
        />
      </svg>
    </div>,
    document.body
  );
};
