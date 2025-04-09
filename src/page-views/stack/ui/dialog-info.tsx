import { TypographyList, TypographyP } from "@/components/ui/typography";
import { VisualArrayItem, VisualArrayWrapper } from "@/features/visual-array";
import { ArrowLeft, ArrowLeftRight } from "lucide-react";

export const DialogInfo = () => {
  return (
    <div>
      <TypographyP>
        A stack is a linear data structure that follows the Last-In, First-Out
        (LIFO) principle.
      </TypographyP>
      <TypographyP>
        <strong>In essence:</strong> A stack operates like a stack of plates;
        you can only add or remove elements from the top. The last element added
        is the first one to be removed.
      </TypographyP>

      <TypographyP>Pros:</TypographyP>
      <TypographyList>
        <li>
          <strong>Simple implementation:</strong> Easy to understand and
          implement.
        </li>
        <li>
          <strong>Efficient Operations:</strong> Push and pop operations are
          very fast (O(1)).
        </li>
      </TypographyList>
      <TypographyP>Cons:</TypographyP>
      <TypographyList>
        <li>
          <strong>Limited Access: </strong> Elements other than the top element
          cannot be accessed directly.
        </li>
        <li>
          <strong>Fixed Size (in some implementations)::</strong>Array-based
          stacks have a fixed size, which can lead to stack overflow if the
          capacity is exceeded.
        </li>
      </TypographyList>
    </div>
  );
};
