// Example fetch wrapper for vendors
export async function fetchVendors() {
  const res = await fetch("http://localhost:4000/vendors");
  return res.json();
}
