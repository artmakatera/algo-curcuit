"use client";
import { useMemo, useState } from "react";

import { TypographyH1 } from "@/components/ui/typography";
import { Footer } from "@/entities/footer/ui/footer";
import { PostCard } from "@/entities/post-card";
import { pages } from "@/shared/constants/pages";
import { SearchInput } from "@/components/ui/search-input";
import { Search } from "lucide-react";

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPages = useMemo(
    () =>
      pages.filter(
        (page) =>
          page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          page.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          page.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          page.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  const groupedPages = useMemo(
    () =>
      filteredPages.reduce((acc, page) => {
        const category = page.category || "Other";
        acc[category] = acc[category] || [];
        acc[category].push(page);
        return acc;
      }, {} as Record<string, typeof pages>),
    [filteredPages]
  );

  return (
    <div className="flex flex-col">
      <main className="flex flex-col items-center px-4 md:px-24 py-10 m-auto grow min-h-[calc(100vh-112px)]">
        <TypographyH1>Explore Algorithms</TypographyH1>
        <div className="w-full max-w-sm self-center mt-6 mb-8 ">
          <SearchInput
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>
        <div className="space-y-8">
          {Object.entries(groupedPages).map(([category, pages]) => (
            <div key={category}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-semibold pl-4">{category}</h2>
              </div>
              <div className="max-w-6xl pt-4 gap-4 grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {pages.map((page) => (
                  <PostCard
                    key={page.link}
                    link={page.link}
                    title={page.title}
                    description={page.description}
                    subcategory={page.subcategory}
                    category={page.category}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        {filteredPages.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse through the categories
              above.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
