import * as React from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type PostCardProps = {
  title: string;
  description: string;
  link: string;
};

export function PostCard({ title, description, link }: PostCardProps) {
  return (
    <Card className="max-w-[350px]">
      <Link href={link}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Link>
    </Card>
  );
}
