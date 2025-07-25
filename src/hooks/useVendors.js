
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { getApiBaseUrl, fetchFromApi } from '../lib/apiClient';

function useVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiBase = getApiBaseUrl();
    if (apiBase) {
      fetchFromApi('vendors')
        .then(setVendors)
        .catch(setError)
        .finally(() => setLoading(false));
    } else {
      supabase
        .from('vendors')
        .select('*')
        .order('name')
        .then(({ data, error }) => {
          if (error) setError(error);
          else setVendors(data);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return { vendors, loading, error };
}
export default useVendors;
