import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ open, onClose }) {
  // Only render sidebar on mobile if open, always render on desktop
  const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;
  if (!open && !isDesktop) return null;
  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {!isDesktop && open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={onClose}
          aria-label="Close sidebar overlay"
        />
      )}
      <aside
        className={`bg-white shadow-xl flex flex-col p-4 fixed top-0 left-0 z-40 h-screen w-56 transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:w-56`}
        style={{ minHeight: '100vh' }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-blue-700">Escrow Admin</h2>
          {/* Only show close button on mobile */}
          {!isDesktop && (
            <button
              className="md:hidden text-gray-500 text-2xl focus:outline-none"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              &times;
            </button>
          )}
        </div>
        <nav className="flex flex-col gap-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</Link>
          <Link to="/parcels" className="text-gray-700 hover:text-blue-600 font-medium">Parcels</Link>
          <Link to="/agents" className="text-gray-700 hover:text-blue-600 font-medium">Agents</Link>
          <Link to="/vendors" className="text-gray-700 hover:text-blue-600 font-medium">Vendors</Link>
          <Link to="/reports" className="text-gray-700 hover:text-blue-600 font-medium">Reports</Link>
        </nav>
        <div className="flex-1" />
        <Link to="/login" className="text-red-500 font-medium mt-8">Logout</Link>
      </aside>
    </>
  );
}
