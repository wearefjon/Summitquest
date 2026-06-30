"use client";

import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";

export default function AdminAdventuresPage() {
  const [adventures, setAdventures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const data = await adminApi.getAdventures();
      setAdventures(data);
    } catch (err) {
      console.error("Failed to load adventures:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await adminApi.updateAdventureStatus(id, status);
      load(); // Refresh the list
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status.");
    }
  };

  return (
    <div>
      <header className="mb-8 mt-8 md:mt-0">
        <h2 className="font-headline-md text-headline-md text-primary mb-2">Content Moderation</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Review and moderate published tours.</p>
      </header>

      <div className="bg-white rounded-[24px] p-6 ambient-shadow border border-outline-variant/20 overflow-hidden">
        {loading ? (
          <div className="py-8 text-center text-on-surface-variant">Loading adventures...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-outline-variant/30">
                  <th className="pb-3 font-label-md text-label-md text-on-surface-variant font-medium">Tour Name</th>
                  <th className="pb-3 font-label-md text-label-md text-on-surface-variant font-medium">Price</th>
                  <th className="pb-3 font-label-md text-label-md text-on-surface-variant font-medium">Operator ID</th>
                  <th className="pb-3 font-label-md text-label-md text-on-surface-variant font-medium">Status</th>
                  <th className="pb-3 font-label-md text-label-md text-on-surface-variant font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-primary">
                {adventures.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-on-surface-variant">No tours found.</td>
                  </tr>
                ) : (
                  adventures.map((adv) => (
                    <tr key={adv.id} className="border-b border-outline-variant/10 hover:bg-surface-off-white transition-colors">
                      <td className="py-4 font-semibold max-w-[300px] truncate">{adv.title}</td>
                      <td className="py-4">₹{adv.price.toLocaleString('en-IN')}</td>
                      <td className="py-4 text-on-surface-variant font-mono text-sm">{adv.operator_id?.slice(0, 8)}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm capitalize ${
                          adv.status === 'published' ? 'bg-success-container text-on-success-container' : 
                          adv.status === 'rejected' ? 'bg-error-container text-on-error-container' :
                          'bg-surface-variant text-on-surface-variant'
                        }`}>
                          {adv.status}
                        </span>
                      </td>
                      <td className="py-4 text-right flex justify-end gap-2">
                        {adv.status !== 'published' && (
                          <button 
                            onClick={() => handleStatusChange(adv.id, "published")}
                            className="px-3 py-1.5 rounded-lg font-label-sm text-label-sm bg-brand-sage text-white hover:opacity-90 transition-opacity"
                          >
                            Approve
                          </button>
                        )}
                        {adv.status !== 'rejected' && (
                          <button 
                            onClick={() => handleStatusChange(adv.id, "rejected")}
                            className="px-3 py-1.5 rounded-lg font-label-sm text-label-sm bg-error text-on-error hover:opacity-90 transition-opacity"
                          >
                            Reject
                          </button>
                        )}
                        {adv.status !== 'pending' && (
                          <button 
                            onClick={() => handleStatusChange(adv.id, "pending")}
                            className="px-3 py-1.5 rounded-lg font-label-sm text-label-sm bg-surface-variant text-on-surface-variant hover:opacity-90 transition-opacity"
                          >
                            Suspend
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
