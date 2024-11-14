import { useCallback, useEffect, useState } from 'react';
import axios from '@services/axios';

function useFetchData(dataUrl) {
  const [ dataList, setDataList ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(dataUrl);
      if (response.status === 200) {
        setDataList(response.data);
      }
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [dataUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return { dataList, isLoading, error, refetch: fetchData };
}

export default useFetchData;