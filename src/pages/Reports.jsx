import React, { useRef, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Chart from "chart.js/auto";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import useWallets from "../hooks/useWallets";


export default function Reports() {
  const { wallets, loading } = useWallets();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => { setSidebarOpen(false); }, []);

  React.useEffect(() => {
    if (!loading && wallets.length > 0 && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      chartInstance.current = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: wallets.map(w => w.owner),
          datasets: [
            {
              label: "Balance",
              data: wallets.map(w => w.balance),
              backgroundColor: "#2563eb",
            },
            {
              label: "Pending Payout",
              data: wallets.map(w => w.pendingPayout ?? w.pending_payout),
              backgroundColor: "#f59e42",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Wallet Balances & Pending Payouts" },
          },
        },
      });
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [loading, wallets]);

  const handleExportCSV = () => {
    const csv = ["Owner,Balance,Pending Payout,Last Payout"].concat(
      wallets.map(w => `${w.owner},${w.balance},${w.pendingPayout ?? w.pending_payout},${w.lastPayout ?? w.last_payout}`)
    ).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wallets_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Wallets Report", 14, 16);
    autoTable(doc, {
      head: [["Owner", "Balance", "Pending Payout", "Last Payout"]],
      body: wallets.map(w => [w.owner, w.balance, w.pendingPayout ?? w.pending_payout, w.lastPayout ?? w.last_payout]),
      startY: 22,
    });
    doc.save("wallets_report.pdf");
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
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Reports</h1>
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4 gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded shadow" onClick={handleExportCSV}>Export CSV</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded shadow" onClick={handleExportPDF}>Export PDF</button>
        </div>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <>
            <div className="bg-white p-6 rounded-xl shadow-lg mb-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600">
                    <th className="p-2">Owner</th>
                    <th className="p-2">Balance</th>
                    <th className="p-2">Pending Payout</th>
                    <th className="p-2">Last Payout</th>
                  </tr>
                </thead>
                <tbody>
                  {wallets.map((w) => (
                    <tr key={w.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{w.owner}</td>
                      <td className="p-2">{w.balance}</td>
                      <td className="p-2">{w.pendingPayout ?? w.pending_payout}</td>
                      <td className="p-2">{w.lastPayout ?? w.last_payout}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg mb-6">
              <h2 className="text-lg font-semibold mb-2">Wallet Metrics</h2>
              <div className="w-full overflow-x-auto">
                <canvas ref={chartRef} height={120} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
