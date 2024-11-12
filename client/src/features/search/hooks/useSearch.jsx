import { useMemo } from "react";
import useFetchData from "@hooks/useFetchData";

const DATA_URL = 'https://fakestoreapi.com/products';

function useSearch(searchTerm) {
  const { dataList, isLoading, error } = useFetchData(DATA_URL);

  const searchResults = useMemo(() => {
    return dataList.filter(product => {
      return Object.values(product).some(value => {
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
  }, [searchTerm, dataList]);

  return { searchResults, isLoading, error }
}

export default useSearch;