import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"


 
export function PostCard() {
  return (
    <Card className="w-[350px]">
      <Link href="/binary-search">
      <CardHeader>
        <CardTitle>Binary Search</CardTitle>
        <CardDescription>
          Binary search is a fast search algorithm with run-time complexity of
          O(log n). This search algorithm works on the principle of divide and
          conquer.
        </CardDescription>
      </CardHeader>
      </Link>

    </Card>

  )
}