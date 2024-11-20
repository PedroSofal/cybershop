// Hooks
import { useCallback, useContext, useEffect, useState } from 'react';

// Contexts
import ShippingContext from '@contexts/ShippingContext';

// Components
import Button from '@buttons/Button';
import TextInput from '@inputs/TextInput';
import getShippingInfo from '@utils/getShippingInfo';

// Utilities
import getFieldset from '@utils/getFieldset';

// Styles
import { css } from '@emotion/react';

const zipFormStyles = css`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
`;

const zipCodeField = getFieldset('zipCode');

function ZipCodeForm({ label, submitSideEffect }) {
  const { shippingInfo, setShippingInfo } = useContext(ShippingContext);

  const [ zipCode, setZipCode ] = useState(shippingInfo.location ? shippingInfo.zipCode : '');
  const [ isFormValid, setIsFormValid ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);

  const handleInputChange = useCallback((e, autoFormat) => {
    const formattedValue = autoFormat(e.target.value);
    setZipCode(formattedValue);
  }, []);

  useEffect(() => calculateZipCode(), [zipCode]);

  function calculateZipCode() {
    if (zipCodeField.isValid(zipCode)) {
      setIsFormValid(true);
      setIsLoading(true);
      setShippingInfo(getShippingInfo(zipCode));
    } else {
      setIsFormValid(false);
      setIsLoading(true);
      setShippingInfo(getShippingInfo(''));
    }
    setIsLoading(false);
  }

  function handleClickSubmit(e) {
    e.preventDefault();
    
    // for screen readers to reannounce the shipping info
    setShippingInfo(getShippingInfo(''));
    setTimeout(() => calculateZipCode(), 0);

    if (submitSideEffect) submitSideEffect();
  }

  return(
    <form
      onSubmit={handleClickSubmit}
      css={zipFormStyles}
      className={isLoading && 'skeletonLoading'}
      aria-label="cálculo do frete a partir do CEP"
    >
      <TextInput
        { ...zipCodeField }
        label={label}
        value={zipCode}
        isValid={isFormValid || isLoading}
        onChange={(e) => handleInputChange(e, zipCodeField.autoFormat)}
      />

      <Button main disabled={!isFormValid} ariaLabel="Calcular frete">Calcular</Button>
    </form>
  );
}

export default ZipCodeForm;