import React from "react";
import Sidebar from "../components/Sidebar";

import useVendors from "../hooks/useVendors";

export default function VendorsReview() {
  const { vendors, loading } = useVendors();

  const handleAction = (id, action) => {
    // Optionally, update status in Supabase here
    // This is a UI-only update for now
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar open={true} />
      <main className="flex-1 p-2 sm:p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Vendors Review</h1>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-lg text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v) => (
                  <tr key={v.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{v.name}</td>
                    <td className="p-2">{v.email}</td>
                    <td className="p-2 capitalize">{v.status}</td>
                    <td className="p-2">
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                        onClick={() => handleAction(v.id, "approve")}
                        disabled={v.status === "approved"}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleAction(v.id, "reject")}
                        disabled={v.status === "rejected"}
                      >
                        Reject
                      </button>
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
