// Example fetch wrapper for parcels
export async function fetchParcels() {
  const res = await fetch("http://localhost:4000/parcels");
  return res.json();
}
