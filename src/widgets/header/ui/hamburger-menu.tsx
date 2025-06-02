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
  // Group pages by category
  const groupedPages = pages.reduce((acc, page) => {
    const category = page.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(page);
    return acc;
  }, {} as Record<string, typeof pages>);

  return (
    <Popover>
      <PopoverTrigger>
        <HamburgerMenuIcon width={24} height={24} />
      </PopoverTrigger>
      <PopoverContent className="p-0 pt-2 w-screen sm:w-60 h-screen sm:h-auto z-2000">
        <div className="max-h-[80vh] sm:max-h-none overflow-y-auto">
          {Object.entries(groupedPages).map(([category, categoryPages]) => (
            <div key={category} className="mb-4 last:mb-0">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 capitalize tracking-wide ">
                {category}
              </div>
              {categoryPages.map((page) => (
                <Link
                  key={page.link}
                  href={page.link}
                  className="block w-full text-left text-sm py-2 px-4 hover:bg-slate-200 cursor-pointer"
                >
                  <PopoverClose>{page.title}</PopoverClose>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
