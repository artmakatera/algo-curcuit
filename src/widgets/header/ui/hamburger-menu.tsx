import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";

// Constants
import { pages } from "@/shared/constants/pages";

export const HamburgerMenu = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <HamburgerMenuIcon width={24} height={24} />
      </PopoverTrigger>
      <PopoverContent className="p-0 pt-2 w-screen sm:w-60 h-screen sm:h-auto">
        <div>
          {pages.map((page) => (
            <Link
              key={page.link}
              href={page.link}
              className="block w-full text-left text-sm py-2 px-4 hover:bg-slate-200 cursor-pointer"
            >
              <PopoverClose>{page.title}</PopoverClose>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
