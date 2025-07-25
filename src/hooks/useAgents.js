
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getApiBaseUrl, fetchFromApi } from '../lib/apiClient';

function useAgents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiBase = getApiBaseUrl();
    if (apiBase) {
      fetchFromApi('agents')
        .then(setAgents)
        .catch(setError)
        .finally(() => setLoading(false));
    } else {
      supabase
        .from('agents')
        .select('*')
        .order('name')
        .then(({ data, error }) => {
          if (error) setError(error);
          else setAgents(data);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return { agents, loading, error };
}
export default useAgents;
