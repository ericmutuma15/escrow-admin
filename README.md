
# Escrow Admin Dashboard

This is a modern admin dashboard for managing an escrow system, built with React and Vite. The app allows admins to manage parcels, agents, vendors, and view financial reports, all powered by a Supabase backend.

## Production Link

👉 [Live App on Vercel](https://mutuma-escrowproject.vercel.app)

## Login Information

For demo/testing purposes, you can log in using **any email** (as long as it is in a valid email format) and **any password** (must be alphanumeric and at least 8 characters long).

---

## Tech Stack

- **React** (UI library)
- **Vite** (build tool)
- **Supabase** (PostgreSQL database & auth)
- **Tailwind CSS** (styling)
- **Chart.js** (data visualization)
- **jsPDF** (PDF export)

## Features

- Secure login and authentication
- Manage parcels, agents, and vendors
- Review and update parcel statuses
- Generate and export financial reports (CSV/PDF)
- Responsive sidebar navigation



## Getting Started (Development)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ericmutuma15/escrow-admin.git
   cd escrow-admin
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` (or edit `.env` directly)
   - Add your Supabase project credentials (see `.env` for details)


4. **Start the local mock API server (for development):**
   ```bash
   npx json-server --watch db.json --port 4000
   ```
   This will start a mock REST API at [http://localhost:4000](http://localhost:4000)

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173)

## Deployment

This app is ready to deploy on [Vercel](https://vercel.com/) and supports client-side routing out of the box.

---
For any issues or contributions, please open an issue or pull request on GitHub.
