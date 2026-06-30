"use client";

import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";

export default function AdminOperatorsPage() {
  const [operators, setOperators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const data = await adminApi.getOperators();
      setOperators(data);
    } catch (err) {
      console.error("Failed to load operators:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const handleVerify = async (id: string) => {
    try {
      await adminApi.verifyOperator(id);
      load(); // Refresh the list
    } catch (err) {
      console.error("Failed to verify operator:", err);
      alert("Verification toggle failed.");
    }
  };

  return (
    <div>
      <header className="mb-8 mt-8 md:mt-0">
        <h2 className="font-headline-md text-headline-md text-primary mb-2">Operator Verification</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Review and verify travel operators.</p>
      </header>

      <div className="bg-white rounded-[24px] p-6 ambient-shadow border border-outline-variant/20 overflow-hidden">
        {loading ? (
          <div className="py-8 text-center text-on-surface-variant">Loading operators...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-outline-variant/30">
                  <th className="pb-3 font-label-md text-label-md text-on-surface-variant font-medium">Company Name</th>
                  <th className="pb-3 font-label-md text-label-md text-on-surface-variant font-medium">Location</th>
                  <th className="pb-3 font-label-md text-label-md text-on-surface-variant font-medium">Fee %</th>
                  <th className="pb-3 font-label-md text-label-md text-on-surface-variant font-medium">Verification Status</th>
                  <th className="pb-3 font-label-md text-label-md text-on-surface-variant font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-primary">
                {operators.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-on-surface-variant">No operators found.</td>
                  </tr>
                ) : (
                  operators.map((op) => (
                    <tr key={op.id} className="border-b border-outline-variant/10 hover:bg-surface-off-white transition-colors">
                      <td className="py-4 font-semibold">{op.name}</td>
                      <td className="py-4 text-on-surface-variant">{op.location || "N/A"}</td>
                      <td className="py-4 font-mono">{(op.commission_rate * 100).toFixed(1)}%</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm ${
                          op.is_verified ? 'bg-brand-sage text-white' : 'bg-surface-variant text-on-surface-variant'
                        }`}>
                          {op.is_verified ? "Verified" : "Unverified"}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => handleVerify(op.id)}
                          className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-colors ${
                            op.is_verified 
                              ? 'bg-surface-variant text-on-surface-variant hover:bg-error hover:text-on-error' 
                              : 'bg-primary text-on-primary hover:bg-secondary'
                          }`}
                        >
                          {op.is_verified ? "Revoke" : "Approve"}
                        </button>
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
