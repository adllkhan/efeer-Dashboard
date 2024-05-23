"use client";

import { Suspense } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Agents } from "@/components/Agents";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function AgentsPage() {
  return (
    <div className="w-full h-full">
      <Sidebar page="agents" />
      <div className="sm:ml-20">
        <h1 className="m-6 text-lg">Agents</h1>
        <Agents />
      </div>
    </div>
  );
}
