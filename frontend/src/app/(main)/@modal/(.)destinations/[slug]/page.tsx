import { DestinationDetailsOverlay } from "@/components/destinations/DestinationDetailsOverlay";

export default async function DestinationModal({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DestinationDetailsOverlay slug={slug} />;
}
