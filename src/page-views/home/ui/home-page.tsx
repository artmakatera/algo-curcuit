import { TypographyH1 } from "@/components/ui/typography";
import { PostCard } from "@/entities/post-card";

export const HomePage = () => {
  return (
    <main className="flex flex-col items-center px-24 py-10">
      <TypographyH1>Explore Algorithms</TypographyH1>

      <div className="pt-4 flex gap-4 w-full">
        <PostCard
          link="/binary-search"
          title="Binary Search"
          description="Binary search is a fast search algorithm with run-time complexity of
            O(log n). This search algorithm works on the principle of divide and
            conquer."
        />
        <PostCard
          link="/binary-search-rotated-array"
          title="Binary Search Rotated Array"
          description="Binary search in a rotated array is a variation of the binary search with run-time complexity of
            O(log n). This search algorithm works on the principle of divide and conquer."
        />
      </div>
    </main>
  );
};
