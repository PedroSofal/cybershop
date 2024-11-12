import { useEffect } from "react";

function useInitializeData(isLoading, dataList, setFormValues, selectedDataId, setSelectedDataId) {
  useEffect(() => {
    if (isLoading) return;

    if (dataList.length > 0) {
      const matchingData = selectedDataId && dataList.find(data => data.id == selectedDataId);
      const data = matchingData || dataList[0];
      // eslint-disable-next-line no-unused-vars
      const { id, userId, ...rest } = data;
      setFormValues(prev => ({ ...prev, ...rest }));

      if (setSelectedDataId && !matchingData) {
        setSelectedDataId(data.id);
      }
    }
  }, [isLoading, dataList, selectedDataId]);
}

export default useInitializeData;