import { TypographyH1 } from "@/components/ui/typography";
import { Footer } from "@/entities/footer/ui/footer";
import { PostCard } from "@/entities/post-card";
import { pages } from "@/shared/constants/pages";

export const HomePage = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-54px)]">
      <main className="flex flex-col items-center px-4 md:px-24 py-10 m-auto shadow-md grow">
        <TypographyH1>Explore Algorithms</TypographyH1>

        <div className="max-w-6xl pt-4 gap-4 grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pages.map((page) => (
            <PostCard
              key={page.link}
              link={page.link}
              title={page.title}
              description={page.description}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};
