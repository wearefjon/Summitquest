"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchOperatorById, fetchAdventures } from "@/lib/api";
import { useParams } from "next/navigation";
import { Star, MapPin, CheckCircle, Award, ShieldCheck, Heart } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export function OperatorProfile() {
  const params = useParams();
  const operatorId = params.id as string;

  const { data: operator, isLoading: isLoadingOp } = useQuery({
    queryKey: ["operator", operatorId],
    queryFn: () => fetchOperatorById(operatorId),
  });

  // We should fetch adventures for this operator but our API doesn't filter by operator_id natively yet, 
  // so we fetch all and filter client side for now (or we could add operator_id to backend filters)
  const { data: adventures, isLoading: isLoadingAdv } = useQuery({
    queryKey: ["adventures"],
    queryFn: () => fetchAdventures(),
  });

  const operatorAdventures = adventures?.filter(a => a.operator_id === operatorId) || [];

  if (isLoadingOp) {
    return (
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
        <div className="animate-pulse bg-surface-variant rounded-2xl h-64 w-full" />
      </div>
    );
  }

  if (!operator) {
    return (
      <div className="py-24 text-center">
        <h2 className="font-headline-md text-primary">Operator not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 space-y-16">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter items-start">
        {/* Left Sidebar */}
        <div className="col-span-1 bg-surface-off-white rounded-24px p-8 border border-outline-variant/30 flex flex-col items-center text-center shadow-sm">
          <img 
            src={operator.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"} 
            alt={operator.name}
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow-md"
          />
          <h1 className="font-headline-md text-primary mb-2">{operator.name}</h1>
          <p className="font-body-md text-on-surface-variant mb-6">Certified Alpine Professionals</p>
          
          <div className="flex items-center gap-2 mb-8 bg-surface-container-low px-4 py-2 rounded-full">
            <Star className="w-5 h-5 text-accent-gold fill-accent-gold" />
            <span className="font-label-md text-on-surface">{operator.rating} ({operator.review_count} Reviews)</span>
          </div>

          <div className="w-full space-y-4 border-t border-outline-variant/30 pt-6 text-left">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-secondary" />
              <span className="font-body-md text-on-surface-variant">Identity Verified</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-secondary" />
              <span className="font-body-md text-on-surface-variant">Superhost</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-secondary" />
              <span className="font-body-md text-on-surface-variant">{operator.location || "Maharashtra"}</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-secondary" />
              <span className="font-body-md text-on-surface-variant">Joined {format(new Date(operator.member_since), "yyyy")}</span>
            </div>
          </div>
          
          <button className="w-full mt-8 bg-surface-variant text-primary font-label-md py-3 rounded-xl hover:bg-surface-dim transition-colors border border-outline-variant/50">
            Contact Host
          </button>
        </div>

        {/* Right Content */}
        <div className="col-span-1 md:col-span-2 space-y-12">
          <div>
            <h2 className="font-headline-sm text-primary mb-4">About {operator.name}</h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              {operator.description}
            </p>
          </div>

          <div>
            <h2 className="font-headline-sm text-primary mb-6">Experiences Hosted by {operator.name}</h2>
            
            {isLoadingAdv ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="h-64 bg-surface-variant animate-pulse rounded-2xl"></div>
                <div className="h-64 bg-surface-variant animate-pulse rounded-2xl"></div>
              </div>
            ) : operatorAdventures.length === 0 ? (
              <p className="text-on-surface-variant">This operator currently has no active experiences.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {operatorAdventures.map((adv) => (
                  <Link href={`/adventures/${adv.slug}`} key={adv.id} className="group cursor-pointer">
                    <div className="relative h-48 rounded-2xl overflow-hidden mb-3">
                      <img src={adv.image_url} alt={adv.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full shadow-sm">
                        <Heart className="w-4 h-4 text-brand-coral" />
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-label-md text-primary mb-1">{adv.title}</h3>
                        <p className="font-label-sm text-on-surface-variant">{adv.duration_days} Day{adv.duration_days > 1 ? 's' : ''} • {adv.difficulty}</p>
                      </div>
                      <div className="font-label-md text-primary">
                        ₹{adv.price}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
