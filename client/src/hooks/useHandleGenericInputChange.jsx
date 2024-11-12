import { useCallback } from "react";

function useHandleGenericInputChange() {
  const handleGenericInputChange = useCallback((
    e,
    autoFormat,
    setFormValues,
    setSuccess,
    setErrMsg
  ) => {
    const { name, value } = e.target;
    const formattedValue = autoFormat ? autoFormat(value) : value;
    setFormValues(prev => ({ ...prev, [name]: formattedValue }));
    if (setSuccess) setSuccess(false);
    if (setErrMsg) setErrMsg('');
  }, []);

  return { handleGenericInputChange }
}

export default useHandleGenericInputChange;