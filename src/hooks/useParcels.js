import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

function useParcels() {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase
      .from('parcels')
      .select('*')
      .order('created', { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error);
        else setParcels(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return { parcels, loading, error };
}
export default useParcels;
