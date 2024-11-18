import { useMemo } from "react";
import useFetchFromStore from "@hooks/useFetchFromStore";

function useSearch(searchTerm) {
  const { dataList, isLoading, error } = useFetchFromStore('/products');

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