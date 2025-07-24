import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

function useAgents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase
      .from('agents')
      .select('*')
      .order('name')
      .then(({ data, error }) => {
        if (error) setError(error);
        else setAgents(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return { agents, loading, error };
}
export default useAgents;
