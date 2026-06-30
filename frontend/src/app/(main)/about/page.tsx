import Link from "next/link";
import { Users, Compass, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "About Us | SummitQuest",
  description: "Learn more about SummitQuest and our mission to bring you the best outdoor adventures.",
};

export default function AboutPage() {
  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 space-y-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="font-display-lg-mobile md:font-display-lg text-primary mb-6">About SummitQuest</h1>
        <p className="font-body-lg text-on-surface-variant leading-relaxed">
          We are on a mission to connect adventure seekers with the most trusted, experienced local operators in the world. Our platform empowers you to explore breathtaking landscapes while supporting local communities safely and sustainably.
        </p>
      </section>

      {/* Core Values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
        <div className="bg-surface-off-white p-8 rounded-2xl border border-outline-variant/30 text-center shadow-sm">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Compass className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-headline-sm text-primary mb-3">Authentic Experiences</h3>
          <p className="font-body-md text-on-surface-variant">We partner with local experts who know the hidden trails and rich histories of their regions better than anyone.</p>
        </div>

        <div className="bg-surface-off-white p-8 rounded-2xl border border-outline-variant/30 text-center shadow-sm">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-headline-sm text-primary mb-3">Safety First</h3>
          <p className="font-body-md text-on-surface-variant">Every operator on our platform undergoes a strict verification process, ensuring your safety is never compromised.</p>
        </div>

        <div className="bg-surface-off-white p-8 rounded-2xl border border-outline-variant/30 text-center shadow-sm">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-headline-sm text-primary mb-3">Community Driven</h3>
          <p className="font-body-md text-on-surface-variant">We believe in eco-friendly tourism that directly supports the livelihoods of local guides and their families.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white rounded-3xl p-12 text-center mt-16">
        <h2 className="font-headline-md mb-4">Ready to start your journey?</h2>
        <p className="font-body-md opacity-90 mb-8 max-w-xl mx-auto">Join thousands of travelers who have already discovered the beauty of the wild with SummitQuest.</p>
        <Link href="/adventures" className="inline-block bg-white text-primary font-label-md px-8 py-3 rounded-full hover:bg-surface-off-white transition-colors">
          Explore Adventures
        </Link>
      </section>
    </div>
  );
}
