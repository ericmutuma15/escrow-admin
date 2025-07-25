import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

import useParcels from "../hooks/useParcels";
import useAgents from "../hooks/useAgents";

function StatusIcon({ status }) {
  if (status === "delivered") {
    return (
      <span
        title="Delivered"
        className="inline-block w-4 h-4 rounded-full bg-green-500 mr-2 align-middle shadow-green-400 shadow-lg animate-pulse"
        style={{ boxShadow: '0 0 10px 2px #4ade80, 0 0 20px 4px #4ade80' }}
      ></span>
    );
  }
  if (status === "failed") {
    return (
      <span
        title="Failed"
        className="inline-block w-4 h-4 rounded-full bg-red-500 mr-2 align-middle shadow-red-400 shadow-lg animate-pulse"
        style={{ boxShadow: '0 0 10px 2px #f87171, 0 0 20px 4px #f87171' }}
      ></span>
    );
  }
  return (
    <span
      title="In Transit"
      className="inline-block w-4 h-4 rounded-full bg-yellow-400 mr-2 align-middle shadow-yellow-300 shadow-lg animate-pulse"
      style={{ boxShadow: '0 0 10px 2px #fde047, 0 0 20px 4px #fde047' }}
    ></span>
  );
}

export default function Dashboard() {
  const { parcels, loading: parcelsLoading } = useParcels();
  const { agents, loading: agentsLoading } = useAgents();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const loading = parcelsLoading || agentsLoading;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle button */}
      <button
        className="fixed top-4 left-4 z-30 md:hidden bg-blue-600 text-white p-2 rounded shadow-lg focus:outline-none"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 p-2 sm:p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="min-w-[700px] w-full bg-white rounded-xl shadow-lg text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-2 whitespace-nowrap">Parcel ID</th>
                  <th className="p-2 whitespace-nowrap">Status</th>
                  <th className="p-2 whitespace-nowrap">Sender</th>
                  <th className="p-2 whitespace-nowrap">Receiver</th>
                  <th className="p-2 whitespace-nowrap">Pickup Agent</th>
                  <th className="p-2 whitespace-nowrap">Created</th>
                  <th className="p-2 whitespace-nowrap">Updated</th>
                </tr>
              </thead>
              <tbody>
                {parcels.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono whitespace-nowrap">{p.id}</td>
                    <td className="p-2 flex items-center whitespace-nowrap">
                      <StatusIcon status={p.status} />
                      <span className="capitalize">{p.status}</span>
                    </td>
                    <td className="p-2 whitespace-nowrap">{p.sender}</td>
                    <td className="p-2 whitespace-nowrap">{p.receiver}</td>
                    <td className="p-2 whitespace-nowrap">{p.agent}</td>
                    <td className="p-2 whitespace-nowrap">{p.created}</td>
                    <td className="p-2 whitespace-nowrap">{p.updated}</td>
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
