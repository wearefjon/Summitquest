"use client";

import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await adminApi.getUsers();
        setUsers(data);
      } catch (err) {
        console.error("Failed to load users:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      <header className="mb-8 mt-8 md:mt-0">
        <h2 className="font-headline-md text-headline-md text-primary mb-2">User Directory</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Manage customers and operators on the platform.</p>
      </header>

      <div className="bg-white rounded-[24px] p-6 ambient-shadow border border-outline-variant/20 overflow-hidden">
        {loading ? (
          <div className="py-8 text-center text-on-surface-variant">Loading users...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-outline-variant/30">
                  <th className="pb-3 font-label-md text-label-md text-on-surface-variant font-medium">Name</th>
                  <th className="pb-3 font-label-md text-label-md text-on-surface-variant font-medium">Email</th>
                  <th className="pb-3 font-label-md text-label-md text-on-surface-variant font-medium">Role</th>
                  <th className="pb-3 font-label-md text-label-md text-on-surface-variant font-medium">Status</th>
                  <th className="pb-3 font-label-md text-label-md text-on-surface-variant font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-primary">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-on-surface-variant">No users found.</td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="border-b border-outline-variant/10 hover:bg-surface-off-white transition-colors">
                      <td className="py-4 font-semibold">{u.full_name}</td>
                      <td className="py-4 text-on-surface-variant">{u.email}</td>
                      <td className="py-4 capitalize">{u.role}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm ${
                          u.status === 'active' ? 'bg-success-container text-on-success-container' : 'bg-surface-variant text-on-surface-variant'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-4 text-on-surface-variant">{new Date(u.created_at).toLocaleDateString()}</td>
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
