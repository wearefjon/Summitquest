"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/useAuth";
import { fetchAdventureBySlug, Adventure, bookingApi } from "@/lib/api";

export default function CheckoutPage({ params }: { params: { adventureId: string } }) {
  const { user } = useAuth();
  const router = useRouter();
  const [adventure, setAdventure] = useState<Adventure | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    if (!user) {
      router.push(`/login?redirect=/checkout/${params.adventureId}`);
      return;
    }

    // Pre-fill user data
    if (user.full_name) {
      const parts = user.full_name.split(" ");
      setFirstName(parts[0] || "");
      setLastName(parts.slice(1).join(" ") || "");
    }
    setEmail(user.email || "");

    async function load() {
      try {
        const data = await fetchAdventureBySlug(params.adventureId);
        setAdventure(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user, router, params.adventureId]);

  if (loading || !adventure) {
    return <div className="flex min-h-[50vh] items-center justify-center">Loading secure checkout...</div>;
  }

  const basePrice = adventure.price * guests;
  const taxes = Math.round(basePrice * 0.18);
  const gear = 1200 * guests;
  const totalPrice = basePrice + taxes + gear;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return alert("Please select a date");
    
    setSubmitting(true);
    try {
      const booking = await bookingApi.createBooking({
        adventure_id: adventure.id,
        booking_date: new Date(date).toISOString(),
        guests: guests
      });
      await bookingApi.confirmBooking(booking.id);
      router.push(`/booking/success?id=${booking.id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to process booking");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-primary mb-2">Complete your booking</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">Review your details and complete the payment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Form Details */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* Guest Details Section */}
          <section className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_12px_32px_rgba(30,41,59,0.04)] border border-outline-variant/20">
            <h2 className="font-headline-sm text-headline-sm text-primary border-b border-outline-variant/30 pb-4 mb-6">Guest Details</h2>
            <form id="checkout-form" onSubmit={handleBooking} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1" htmlFor="date">Date</label>
                  <input required value={date} onChange={e => setDate(e.target.value)} type="date" className="w-full bg-surface-off-white border-outline-variant/30 rounded-[16px] focus:ring-primary focus:border-primary font-body-md text-body-md py-3 px-4" id="date" />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1" htmlFor="guests">Guests</label>
                  <input required value={guests} onChange={e => setGuests(parseInt(e.target.value))} type="number" min="1" max="20" className="w-full bg-surface-off-white border-outline-variant/30 rounded-[16px] focus:ring-primary focus:border-primary font-body-md text-body-md py-3 px-4" id="guests" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1" htmlFor="first_name">First Name</label>
                  <input required value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full bg-surface-off-white border-outline-variant/30 rounded-[16px] focus:ring-primary focus:border-primary font-body-md text-body-md py-3 px-4" id="first_name" placeholder="Enter first name" type="text" />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1" htmlFor="last_name">Last Name</label>
                  <input required value={lastName} onChange={e => setLastName(e.target.value)} className="w-full bg-surface-off-white border-outline-variant/30 rounded-[16px] focus:ring-primary focus:border-primary font-body-md text-body-md py-3 px-4" id="last_name" placeholder="Enter last name" type="text" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1" htmlFor="email">Email Address</label>
                  <input required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-surface-off-white border-outline-variant/30 rounded-[16px] focus:ring-primary focus:border-primary font-body-md text-body-md py-3 px-4" id="email" placeholder="your@email.com" type="email" />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1" htmlFor="phone">Phone Number</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-surface-off-white border-outline-variant/30 rounded-[16px] focus:ring-primary focus:border-primary font-body-md text-body-md py-3 px-4" id="phone" placeholder="+91 00000 00000" type="tel" />
                </div>
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-1" htmlFor="requirements">Additional Requirements (Optional)</label>
                <textarea className="w-full bg-surface-off-white border-outline-variant/30 rounded-[16px] focus:ring-primary focus:border-primary font-body-md text-body-md py-3 px-4" id="requirements" placeholder="Dietary preferences, medical conditions, etc." rows={3}></textarea>
              </div>
            </form>
          </section>

          {/* Payment Method Section */}
          <section className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_12px_32px_rgba(30,41,59,0.04)] border border-outline-variant/20">
            <h2 className="font-headline-sm text-headline-sm text-primary border-b border-outline-variant/30 pb-4 mb-6">Payment Method</h2>
            <div className="space-y-4">
              <label className="flex items-center p-4 border border-primary/20 rounded-[16px] cursor-pointer hover:bg-surface-container-low transition-colors bg-surface-container-low">
                <input defaultChecked className="text-primary focus:ring-primary w-5 h-5" name="payment_method" type="radio" value="upi" />
                <div className="ml-4 flex-grow flex items-center justify-between">
                  <span className="font-label-md text-label-md text-primary">UPI</span>
                  <span className="material-symbols-outlined text-outline" style={{ fontVariationSettings: "'FILL' 0" }}>qr_code_scanner</span>
                </div>
              </label>
              <label className="flex items-center p-4 border border-outline-variant/30 rounded-[16px] cursor-pointer hover:bg-surface-container-low transition-colors">
                <input className="text-primary focus:ring-primary w-5 h-5" name="payment_method" type="radio" value="card" />
                <div className="ml-4 flex-grow flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface">Credit / Debit Card</span>
                  <span className="material-symbols-outlined text-outline" style={{ fontVariationSettings: "'FILL' 0" }}>credit_card</span>
                </div>
              </label>
            </div>
          </section>

        </div>

        {/* Right Column: Sticky Summary */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-[104px] flex flex-col gap-6">
            
            {/* Summary Card */}
            <div className="bg-surface-container-lowest rounded-[24px] overflow-hidden shadow-[0_12px_32px_rgba(30,41,59,0.08)] border border-outline-variant/20">
              <div className="relative h-48 w-full">
                <div className="bg-cover bg-center w-full h-full absolute inset-0" style={{ backgroundImage: `url('${adventure.image_url}')` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-headline-sm text-headline-sm text-on-primary">{adventure.title}</h3>
                  <p className="font-label-sm text-label-sm text-on-primary/80 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                    Maharashtra, India
                  </p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Date</p>
                    <p className="font-label-md text-label-md text-primary mt-1">{date || "Select Date"}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Guests</p>
                    <p className="font-label-md text-label-md text-primary mt-1">{guests} {guests > 1 ? "Adults" : "Adult"}</p>
                  </div>
                </div>
                
                <hr className="border-outline-variant/30 mb-6" />
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant">
                    <span>Base Price (₹{adventure.price} x {guests})</span>
                    <span>₹{basePrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant">
                    <span>Tents & Gear Rental</span>
                    <span>₹{gear.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant">
                    <span>Taxes & Fees</span>
                    <span>₹{taxes.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                
                <hr className="border-outline-variant/30 mb-6" />
                
                <div className="flex justify-between items-center mb-8">
                  <span className="font-headline-sm text-headline-sm text-primary">Total</span>
                  <span className="font-headline-sm text-headline-sm text-primary">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                
                <button form="checkout-form" type="submit" disabled={submitting} className="w-full bg-brand-coral hover:bg-brand-coral/90 text-on-error font-headline-md text-body-lg py-4 rounded-[16px] transition-all transform hover:scale-[1.02] shadow-md flex justify-center items-center gap-2 disabled:opacity-50">
                  {submitting ? "Processing..." : "Confirm & Pay"}
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_forward</span>
                </button>
                <p className="text-center font-label-sm text-label-sm text-on-surface-variant mt-4">
                  By confirming, you agree to our Terms of Service.
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20">
                <span className="material-symbols-outlined text-secondary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                <div>
                  <p className="font-label-md text-label-md text-primary">Secure</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">256-bit encryption</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/20">
                <span className="material-symbols-outlined text-secondary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
                <div>
                  <p className="font-label-md text-label-md text-primary">Support</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">24/7 Assistance</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
