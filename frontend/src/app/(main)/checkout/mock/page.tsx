"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { ShieldCheck, CreditCard, ArrowRight, X } from "lucide-react";

function MockCheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get("booking_id");
  const adventureId = searchParams.get("adventure_id");
  const [processing, setProcessing] = useState(false);

  const handleSuccess = async () => {
    setProcessing(true);
    // Directly simulate webhook by calling the backend to update booking
    try {
      // Call mock webhook to confirm booking in backend
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/payments/mock-webhook?booking_id=${bookingId}`, {
        method: "POST"
      });
      router.push(`/customer/bookings?success=true&booking_id=${bookingId}`);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {
    router.push(`/adventures/${adventureId}?canceled=true`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="bg-surface-container-lowest max-w-md w-full p-8 rounded-3xl shadow-2xl border border-outline-variant/30 text-center relative overflow-hidden">
        {/* Test Mode Ribbon */}
        <div className="absolute top-4 -right-10 bg-yellow-400 text-black font-label-sm text-[10px] py-1 px-10 transform rotate-45 shadow-sm">
          TEST MODE
        </div>

        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CreditCard className="w-10 h-10 text-primary" />
        </div>
        <h1 className="font-headline-md text-primary mb-2">Simulate Payment</h1>
        <p className="font-body-md text-on-surface-variant mb-8">
          You are currently in Test Mode. No real payment will be processed. Choose an outcome to continue testing your flow.
        </p>

        <div className="flex flex-col gap-4">
          <button 
            onClick={handleSuccess}
            disabled={processing}
            className="w-full bg-brand-coral hover:bg-brand-coral/90 text-white font-label-md py-4 rounded-2xl transition-all shadow-md flex justify-center items-center gap-2"
          >
            {processing ? "Processing..." : "Simulate Successful Payment"}
            {!processing && <ShieldCheck className="w-5 h-5" />}
          </button>
          
          <button 
            onClick={handleCancel}
            disabled={processing}
            className="w-full bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md py-4 rounded-2xl transition-all flex justify-center items-center gap-2"
          >
            Simulate User Cancellation
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MockCheckoutPage() {
  return (
    <main className="flex-grow w-full max-w-container-max mx-auto py-12">
      <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center">Loading simulation...</div>}>
        <MockCheckoutContent />
      </Suspense>
    </main>
  );
}
