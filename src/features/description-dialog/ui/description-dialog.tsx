import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { BookOpenText } from "lucide-react";

export function DescriptionDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="bg-orange-500 hover:bg-orange-600 fixed bottom-4 right-4 cursor-pointer"
        >
          <BookOpenText />
          <span>Read</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="place-content-start">
        <DialogHeader>
          <DialogTitle>Merge Sort</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100dvh-48px)]">{children}</ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
