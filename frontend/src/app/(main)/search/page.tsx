import { SearchResults } from "@/components/search/SearchResults";
import { Suspense } from "react";

export const metadata = {
  title: "Search Adventures | SummitQuest",
  description: "Search and discover your next outdoor adventure.",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="w-full text-center py-24">Loading search...</div>}>
      <SearchResults />
    </Suspense>
  );
}
