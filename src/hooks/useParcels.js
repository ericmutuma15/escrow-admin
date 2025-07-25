
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getApiBaseUrl, fetchFromApi } from '../lib/apiClient';

function useParcels() {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiBase = getApiBaseUrl();
    if (apiBase) {
      // Dev: fetch from local API
      fetchFromApi('parcels')
        .then(setParcels)
        .catch(setError)
        .finally(() => setLoading(false));
    } else {
      // Prod: fetch from Supabase
      supabase
        .from('parcels')
        .select('*')
        .order('created', { ascending: false })
        .then(({ data, error }) => {
          if (error) setError(error);
          else setParcels(data);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return { parcels, loading, error };
}
export default useParcels;
