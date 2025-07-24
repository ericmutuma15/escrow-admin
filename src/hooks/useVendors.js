import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

function useVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase
      .from('vendors')
      .select('*')
      .order('name')
      .then(({ data, error }) => {
        if (error) setError(error);
        else setVendors(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return { vendors, loading, error };
}
export default useVendors;
