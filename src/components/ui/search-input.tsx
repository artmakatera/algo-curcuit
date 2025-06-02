
import { cn } from "@/shared/lib/utils";
import { Input } from "./input";
import { Search } from "lucide-react";




export const SearchInput = ({
  className,
  ...props
}: React.ComponentProps<typeof Input>) => {
  return (
  <div className="relative">
    <Input
      className={cn("w-full pl-10", className)}
      placeholder="Search..."
      {...props}
    />
    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
    </div>
  );
};
