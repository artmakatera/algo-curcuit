import { TypographyH1 } from "@/components/ui/typography";
import { PostCard } from "@/entities/post-card";


export const HomePage = () => {
  return (
    <main className="flex flex-col items-center px-24 py-10">
      <TypographyH1>Explore Algorithms</TypographyH1>

      <div className="pt-4 flex gap-4 w-full">
        <PostCard />
      </div>
    </main>
  );
}