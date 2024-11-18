import { useCallback, useEffect, useState } from 'react';
import { storeAPI } from '@services/axios';

function useFetchFromStore(dataUrl) {
  const [ dataList, setDataList ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await storeAPI.get(dataUrl);
      
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

export default useFetchFromStore;