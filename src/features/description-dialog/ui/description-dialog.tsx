import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlgorithmComplexities } from "@/features/algorithm-complexity";
import { Complexity } from "@/shared/constants/complexities";
import { cn } from "@/shared/lib/utils";

import { BookOpenText } from "lucide-react";

interface DescriptionDialogProps {
  children: React.ReactNode;
  title: string;
  spaceComplexity?: Complexity;
  timeComplexity?: Complexity;
  timeComplexityDescription?: React.ReactNode;
  spaceComplexityDescription?: React.ReactNode;
  ButtonProps?: React.ComponentProps<"button">
}

export function DescriptionDialog({
  title,
  children,
  timeComplexity,
  spaceComplexity,
  spaceComplexityDescription,
  timeComplexityDescription,
  ButtonProps,
}: DescriptionDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          {...ButtonProps}
          variant="destructive"
          className={cn("bg-orange-500 hover:bg-orange-600 dark:bg-orange-500 fixed bottom-4 right-4 cursor-pointer", ButtonProps?.className)}
        >
          <BookOpenText />
          <span>Read</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="place-content-start px-0">
        <DialogHeader className="flex-row items-center px-4">
          <DialogTitle>{title}</DialogTitle>
         <AlgorithmComplexities
          spaceComplexity={spaceComplexity}
          timeComplexity={timeComplexity}
          spaceComplexityDescription={spaceComplexityDescription}
          timeComplexityDescription={timeComplexityDescription}
        />
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100dvh-48px)] px-4 pb-4">
          {children}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
