"use client";
import { useRef } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

type PostCardProps = {
  title: string;
  description: string;
  link: string;
  subcategory: string;
  category?: string;
};

export function PostCard({
  title,
  description,
  link,
  subcategory,
}: PostCardProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  return (
    <Card
      key={link}
      className="hover:shadow-lg transition-all duration-200 cursor-pointer group h-full"
      onClick={() => {
        if (linkRef.current) {
          linkRef.current.click();
        }
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </CardTitle>
          <Link
            href={link}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
            ref={linkRef}
            title="Read more"
            aria-label={`Read more about ${title}`}
          >
            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary flex-shrink-0 mt-1" />
          </Link>
        </div>
        <Badge variant="outline" className="text-xs w-fit">
          {subcategory}
        </Badge>
      </CardHeader>

      <CardContent className="pt-0 flex flex-col h-full">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
