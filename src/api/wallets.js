// Example fetch wrapper for wallets
export async function fetchWallets() {
  const res = await fetch("http://localhost:4000/wallets");
  return res.json();
}
