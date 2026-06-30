"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/store/useAuth";
import { fetchDestinations, Destination } from "@/lib/api";

export default function CreateAdventurePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [destinations, setDestinations] = useState<Destination[]>([]);
  
  // Form State
  const [title, setTitle] = useState("");
  const [activityType, setActivityType] = useState("trekking");
  const [difficulty, setDifficulty] = useState("moderate");
  const [duration, setDuration] = useState("2");
  const [shortDesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("1500");
  const [destinationId, setDestinationId] = useState("");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1621217595537-8eec4c1f930c?q=80&w=1470&auto=format&fit=crop");
  
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.role !== "operator") {
      router.push("/login");
      return;
    }
    async function load() {
      try {
        const dests = await fetchDestinations();
        setDestinations(dests);
        if (dests.length > 0) setDestinationId(dests[0].id);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // In a real app, you'd post to your backend.
      // For now we'll just log and redirect
      console.log("Creating adventure:", { title, activityType, difficulty, duration, shortDesc, desc, price, destinationId, imageUrl });
      
      // Let's assume we have an api method: api.createAdventure(...)
      // Since it's not defined in api.ts yet, we'll just simulate it or call apiClient.post
      const res = await fetch("http://localhost:8000/api/v1/adventures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${(useAuth.getState() as any).token}`
        },
        body: JSON.stringify({
          title,
          slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          activity_type: activityType,
          difficulty,
          duration_days: parseInt(duration),
          short_description: shortDesc,
          description: desc,
          price: parseFloat(price),
          destination_id: destinationId,
          image_url: imageUrl
        })
      });
      
      if (!res.ok) throw new Error("Failed to create adventure");
      
      router.push("/operator/tours");
    } catch (err) {
      console.error(err);
      alert("Error creating adventure");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background text-on-surface font-body-md antialiased min-h-screen flex">
      {/* Side Navigation */}
      <nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface shadow-md p-4 gap-2 z-40 border-r border-outline-variant/30">
        <div className="mb-8 px-4 mt-4">
          <Link href="/">
            <h1 className="font-headline-sm text-headline-sm font-bold text-primary">SummitQuest</h1>
          </Link>
        </div>
        <div className="flex items-center gap-4 px-4 py-3 mb-6 bg-surface-container rounded-xl">
          <div className="w-10 h-10 rounded-full bg-brand-coral text-white flex items-center justify-center font-bold text-lg">
            {user?.full_name?.charAt(0) || "O"}
          </div>
          <div>
            <div className="font-label-md text-label-md font-bold text-on-surface">{user?.full_name}</div>
            <div className="font-label-sm text-label-sm text-on-surface-variant">Operator</div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col gap-1">
          <Link href="/operator" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-variant/50 transition-all font-label-md text-label-md">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>
          <Link href="/operator/tours" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary-container text-on-secondary-container font-bold font-label-md text-label-md translate-x-1 duration-200">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>map</span>
            My Tours
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 relative min-h-screen pb-24 md:pb-0">
        {/* Page Header & Stepper */}
        <div className="bg-surface-off-white border-b border-outline-variant/20 pt-8 pb-6 px-margin-mobile md:px-margin-desktop sticky top-0 z-20">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors group">
                <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
              </button>
              <div>
                <h1 className="font-headline-md text-headline-md text-primary font-bold">New Adventure</h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">Provide the core details to start building your new offering.</p>
              </div>
            </div>
            {/* Stepper */}
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-outline-variant/30 -z-10 -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-0 w-1/3 h-[2px] bg-primary -z-10 -translate-y-1/2 transition-all duration-500"></div>
              
              <div className="flex flex-col items-center gap-2 relative bg-surface-off-white px-2">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-label-md text-label-md shadow-sm">1</div>
                <span className="font-label-sm text-label-sm text-primary font-bold hidden sm:block">Basic Info</span>
              </div>
              <div className="flex flex-col items-center gap-2 relative bg-surface-off-white px-2">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-outline-variant text-outline flex items-center justify-center font-label-md text-label-md">2</div>
                <span className="font-label-sm text-label-sm text-outline hidden sm:block">Details</span>
              </div>
              <div className="flex flex-col items-center gap-2 relative bg-surface-off-white px-2">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-outline-variant text-outline flex items-center justify-center font-label-md text-label-md">3</div>
                <span className="font-label-sm text-label-sm text-outline hidden sm:block">Pricing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Canvas */}
        <div className="p-margin-mobile md:p-margin-desktop max-w-3xl mx-auto">
          <div className="bg-white rounded-[24px] ambient-shadow p-6 md:p-8 mb-8 border border-outline-variant/20">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-6">Adventure Information</h2>
            
            <form id="adventure-form" onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-primary">Adventure Title <span className="text-brand-coral">*</span></label>
                <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-surface-off-white border-outline-variant/40 rounded-2xl px-4 py-3 font-body-md text-body-md focus:ring-2 focus:ring-primary focus:border-primary transition-shadow" placeholder="e.g. Sunrise Trek to Rajmachi Fort" type="text"/>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-primary">Destination <span className="text-brand-coral">*</span></label>
                <select required value={destinationId} onChange={e => setDestinationId(e.target.value)} className="w-full bg-surface-off-white border-outline-variant/40 rounded-2xl px-4 py-3 font-body-md text-body-md focus:ring-2 focus:ring-primary focus:border-primary">
                  {destinations.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-primary">Difficulty Level <span className="text-brand-coral">*</span></label>
                  <select required value={difficulty} onChange={e => setDifficulty(e.target.value)} className="w-full bg-surface-off-white border-outline-variant/40 rounded-2xl px-4 py-3 font-body-md text-body-md focus:ring-2 focus:ring-primary focus:border-primary">
                    <option value="Easy">Easy (Beginner Friendly)</option>
                    <option value="Moderate">Moderate (Some experience needed)</option>
                    <option value="Hard">Hard (Good fitness required)</option>
                    <option value="Extreme">Extreme (Technical skills required)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-primary">Duration (Days) <span className="text-brand-coral">*</span></label>
                  <input required value={duration} onChange={e => setDuration(e.target.value)} className="w-full bg-surface-off-white border-outline-variant/40 rounded-2xl px-4 py-3 font-body-md text-body-md focus:ring-2 focus:ring-primary focus:border-primary" min="1" type="number"/>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-primary">Price (₹) <span className="text-brand-coral">*</span></label>
                <input required value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-surface-off-white border-outline-variant/40 rounded-2xl px-4 py-3 font-body-md text-body-md focus:ring-2 focus:ring-primary focus:border-primary" min="1" type="number"/>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-primary">Short Summary <span className="text-brand-coral">*</span></label>
                <textarea required value={shortDesc} onChange={e => setShortDesc(e.target.value)} className="w-full bg-surface-off-white border-outline-variant/40 rounded-2xl px-4 py-3 font-body-md text-body-md focus:ring-2 focus:ring-primary focus:border-primary resize-none" placeholder="Brief overview..." rows={2}></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-primary">Full Description <span className="text-brand-coral">*</span></label>
                <textarea required value={desc} onChange={e => setDesc(e.target.value)} className="w-full bg-surface-off-white border-outline-variant/40 rounded-2xl px-4 py-3 font-body-md text-body-md focus:ring-2 focus:ring-primary focus:border-primary resize-none" placeholder="Detailed itinerary and info..." rows={5}></textarea>
              </div>
            </form>
          </div>

          {/* Action Bar */}
          <div className="fixed bottom-0 left-0 w-full md:w-auto md:static bg-white md:bg-transparent border-t border-outline-variant/20 md:border-none p-4 md:p-0 flex justify-end gap-4 z-30 ambient-shadow md:shadow-none">
            <button className="px-6 py-3 rounded-2xl border-2 border-primary text-primary font-label-md text-label-md font-bold hover:bg-surface-off-white transition-colors" type="button">
              Save Draft
            </button>
            <button form="adventure-form" disabled={submitting} className="px-8 py-3 rounded-2xl bg-primary text-white font-label-md text-label-md font-bold hover:bg-on-primary-fixed-variant transition-colors ambient-shadow flex items-center gap-2 group" type="submit">
              {submitting ? "Publishing..." : "Publish Adventure"}
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
