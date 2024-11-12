import { useCallback, useContext, useEffect, useState } from 'react';
import AuthContext from '@authentication/contexts/AuthContext';
import axios from '@services/axios';

const ORDERS_URL = '/orders';

function useFetchOrderById(orderId) {
  const { auth } = useContext(AuthContext);
  const [ orderData, setOrderData ] = useState({})
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${ORDERS_URL}/${orderId}`, {
        headers: {
          'user-id': auth.id
        }
      });
      if (response.status === 200) {
        setOrderData(response.data);
      } else {
        setOrderData({});
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [orderId, auth.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return { orderData, isLoading, error, refetch: fetchData };
}

export default useFetchOrderById;