import { useCallback, useContext } from "react";
import ShippingContext from '@contexts/ShippingContext';
import getShippingInfo from '@utils/getShippingInfo';

function useHandleZipCodeChange() {
  const { setShippingInfo } = useContext(ShippingContext);
  
  const handleZipCodeChange = useCallback((
    e,
    autoFormat,
    setAddressValues,
    addressFields
  ) => {
    const { name, value } = e.target;
    const formattedValue = autoFormat ? autoFormat(value) : value;

    // Se o campo for o zipCode, aplica a lógica
    if (name === 'zipCode') {
      const zipCodeField = addressFields.find(field => field.id === 'zipCode');
      
      if (zipCodeField && zipCodeField.isValid(formattedValue)) {
        const shippingInfo = getShippingInfo(formattedValue);
        setShippingInfo(shippingInfo);
        setAddressValues(prev => ({
          ...prev,
          state: shippingInfo.abbr, // Atualiza o estado automaticamente
        }));
      } else {
        setAddressValues(prev => ({
          ...prev,
          state: '', // Limpa o estado se o CEP for inválido
        }));
      }
    }

    // Se o campo for o state, reseta o zipCode
    if (name === 'state') {
      setAddressValues(prev => ({
        ...prev,
        zipCode: '', // Reseta o CEP quando o estado muda
      }));
    }
  }, []);

  return { handleZipCodeChange }
}

export default useHandleZipCodeChange;