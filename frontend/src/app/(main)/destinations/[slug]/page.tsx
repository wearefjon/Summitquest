import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ArrowLeft, Sun, Calendar } from "lucide-react";
import { DESTINATION_DETAILS } from "@/lib/destinations-data";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const dest = DESTINATION_DETAILS[params.slug];
  if (!dest) return { title: "Destination Not Found" };
  return {
    title: `${dest.name} - ${dest.region} | SummitQuest`,
    description: dest.description,
  };
}

export default function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const dest = DESTINATION_DETAILS[params.slug];

  if (!dest) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-surface-off-white pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-end">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dest.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
        
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto pb-16">
          <Link href="/destinations" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all destinations
          </Link>
          <div className="flex items-center gap-2 mb-4 text-primary-container">
            <MapPin className="w-5 h-5" />
            <span className="font-label-md text-lg">{dest.region}</span>
          </div>
          <h1 className="font-display-lg text-white mb-4">{dest.name}</h1>
          <p className="font-body-lg text-white/90 max-w-3xl leading-relaxed">
            {dest.description}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-outline-variant/10 mb-12 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-label-md text-on-surface-variant">Best Time to Visit</h3>
              <p className="font-body-md text-primary font-medium">{dest.bestTimeToVisit}</p>
            </div>
          </div>
          <Link href="/activities" className="bg-primary text-on-primary px-8 py-3 rounded-xl font-label-md hover:bg-secondary transition-colors w-full md:w-auto text-center">
            View Adventures Here
          </Link>
        </div>

        <h2 className="font-headline-md text-primary mb-8">Top Attractions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dest.attractions.map((attraction, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-outline-variant/30 hover:border-primary/30 transition-colors ambient-shadow group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-headline-sm text-on-surface group-hover:text-primary transition-colors">{attraction.name}</h3>
                <span className="px-3 py-1 bg-surface-variant text-on-surface-variant rounded-full text-xs font-medium">
                  {attraction.type}
                </span>
              </div>
              <p className="font-body-md text-on-surface-variant">
                {attraction.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
