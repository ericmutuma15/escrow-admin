// Example fetch wrapper for agents
export async function fetchAgents() {
  const res = await fetch("http://localhost:4000/agents");
  return res.json();
}
