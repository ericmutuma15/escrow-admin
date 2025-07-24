import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

import useParcels from "../hooks/useParcels";

export default function ParcelsManagement() {
  const { parcels, loading } = useParcels();
  const [statusFilter, setStatusFilter] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => { setSidebarOpen(false); }, []);

  const filteredParcels = statusFilter
    ? parcels.filter((p) => p.status === statusFilter)
    : parcels;

  const handleStatusChange = (id, newStatus) => {
    // Optionally, update status in Supabase here
    // This is a UI-only update for now
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle button */}
      {!sidebarOpen && (
        <button
          className="fixed top-4 left-4 z-30 md:hidden bg-blue-600 text-white p-2 rounded shadow-lg focus:outline-none"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      )}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 p-2 sm:p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Parcels Management</h1>
        <div className="mb-4 flex gap-4">
          <select
            className="border p-2 rounded shadow"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="in transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-lg text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-2">Parcel ID</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Sender</th>
                  <th className="p-2">Receiver</th>
                  <th className="p-2">Pickup Agent</th>
                  <th className="p-2">Created</th>
                  <th className="p-2">Updated</th>
                  <th className="p-2">Change Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredParcels.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono">{p.id}</td>
                    <td className="p-2 capitalize">{p.status}</td>
                    <td className="p-2">{p.sender}</td>
                    <td className="p-2">{p.receiver}</td>
                    <td className="p-2">{p.agent}</td>
                    <td className="p-2">{p.created}</td>
                    <td className="p-2">{p.updated}</td>
                    <td className="p-2">
                      <select
                        className="border p-1 rounded"
                        value={p.status}
                        onChange={e => handleStatusChange(p.id, e.target.value)}
                      >
                        <option value="in transit">In Transit</option>
                        <option value="delivered">Delivered</option>
                        <option value="failed">Failed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
