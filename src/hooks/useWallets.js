import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

function useWallets() {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase
      .from('wallets')
      .select('*')
      .order('owner')
      .then(({ data, error }) => {
        if (error) setError(error);
        else setWallets(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return { wallets, loading, error };
}
export default useWallets;
