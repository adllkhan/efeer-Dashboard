"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingSkeleton() {
    const rows = []
    for (let i = 0; i < 3; i++) {
        rows.push(<Skeleton className={"mx-6 my-2 h-14 rounded-xl"}/>)
    }

    return <div>{rows}</div>
}