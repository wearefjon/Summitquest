import { DestinationDetailsOverlay } from "@/components/destinations/DestinationDetailsOverlay";

export default function DestinationModal({ params }: { params: { slug: string } }) {
  return <DestinationDetailsOverlay slug={params.slug} />;
}
