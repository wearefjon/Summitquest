import { OperatorProfile } from "@/components/operators/OperatorProfile";
import { Suspense } from "react";

export const metadata = {
  title: "Operator Profile | SummitQuest",
  description: "View operator details, reviews, and hosted adventures.",
};

export default function OperatorPage() {
  return (
    <Suspense fallback={<div className="w-full text-center py-24">Loading operator...</div>}>
      <OperatorProfile />
    </Suspense>
  );
}
