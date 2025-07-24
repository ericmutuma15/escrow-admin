import React, { useRef } from "react";
import Sidebar from "../components/Sidebar";
import Chart from "chart.js/auto";
import jsPDF from "jspdf";
import "jspdf-autotable";

import useWallets from "../hooks/useWallets";


export default function Reports() {
  const { wallets, loading } = useWallets();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

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
              data: wallets.map(w => w.pending_payout),
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
      wallets.map(w => `${w.owner},${w.balance},${w.pending_payout},${w.last_payout}`)
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
    doc.autoTable({
      head: [["Owner", "Balance", "Pending Payout", "Last Payout"]],
      body: wallets.map(w => [w.owner, w.balance, w.pending_payout, w.last_payout]),
      startY: 22,
    });
    doc.save("wallets_report.pdf");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar open={true} />
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
                      <td className="p-2">{w.pending_payout}</td>
                      <td className="p-2">{w.last_payout}</td>
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
