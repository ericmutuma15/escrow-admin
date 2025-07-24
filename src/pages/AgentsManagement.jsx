import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

import useAgents from "../hooks/useAgents";

export default function AgentsManagement() {
  const [search, setSearch] = useState("");
  const { agents, loading } = useAgents();
  const [showHistory, setShowHistory] = useState(null);

  const filteredAgents = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.location.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id) => {
    // Optionally, update status in Supabase here
    // This is a UI-only update for now
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar open={true} />
      <main className="flex-1 p-2 sm:p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Agents Management
        </h1>
        <input
          type="text"
          placeholder="Search by name or location"
          className="border p-2 rounded mb-4 w-full shadow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-lg text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-2">Name</th>
                  <th className="p-2">Location</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                  <th className="p-2">History</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgents.map((agent) => (
                  <tr key={agent.id} className="border-b">
                    <td className="p-2">{agent.name}</td>
                    <td className="p-2">{agent.location}</td>
                    <td className="p-2">{agent.phone}</td>
                    <td className="p-2 capitalize">{agent.status}</td>
                    <td className="p-2">
                      <button
                        className={`px-2 py-1 rounded text-white ${
                          agent.status === "active" ? "bg-red-500" : "bg-green-500"
                        }`}
                        onClick={() => toggleStatus(agent.id)}
                      >
                        {agent.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                    <td className="p-2 relative">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() =>
                          setShowHistory((prev) =>
                            prev === agent.id ? null : agent.id
                          )
                        }
                      >
                        View History
                      </button>
                      {showHistory === agent.id && (
                        <div className="absolute bg-white border rounded shadow p-4 mt-2 z-10 min-w-[180px]">
                          <h2 className="font-semibold mb-2">Pickup History</h2>
                          <ul className="list-disc pl-5">
                            <li>Parcel P001</li>
                            <li>Parcel P003</li>
                          </ul>
                          <button
                            className="mt-2 text-blue-600 underline"
                            onClick={() => setShowHistory(null)}
                          >
                            Close
                          </button>
                        </div>
                      )}
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
