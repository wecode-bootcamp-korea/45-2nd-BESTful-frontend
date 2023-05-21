import { useEffect, useState } from 'react';

const useFetch = (init, url, method) => {
  const [data, setData] = useState(init);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchResult = async () => {
    try {
      const response = await fetch(url, method);
      const json = await response.json();
      setData(json);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResult();
  }, [url]);

  return { loading: loading, data: data, error: error };
};

export default useFetch;
