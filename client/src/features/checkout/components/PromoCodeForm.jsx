import { useContext, useState } from 'react';
import CheckoutContext from '@checkout/contexts/CheckoutContext';
import TextInput from '@inputs/TextInput';
import Button from '@buttons/Button';
import promoCodes from '@data/promoCodes';
import CircleIconContainer from '@components/ui/containers/CircleIconContainer';
import { Close } from '@mui/icons-material';
import { css } from '@emotion/react';

const appliedCodeStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: var(--input-padding);
  border-radius: var(--border-radius);
  font-size: var(--fs-500);
  background-color: var(--discount-clr);
  cursor: pointer;

  &:hover {
    background-color: var(--error-clr);
  }
`;

const removeIconStyles = css`
  border: 1px solid var(--text-clr-1);
  font-size: var(--fs-300);
  padding: var(--ws-400);
;`

const promoCodeField = {
  id: 'promoCode',
  label: 'Possui um código de desconto? Insira-o aqui:',
  type: 'text',
  required: false,
  ariaDescribedBy: 'promoCodeNote',
  description: 'Tente TRINTOU ou 20OFF :)',
  isValid: (enteredCode) => promoCodes.find(promoCode => {
    return promoCode.code === enteredCode.toUpperCase();
  }),
}

function PromoCodeForm() {
  const [ value, setValue ] = useState('');
  const [ validCode, setValidCode ] = useState(false);

  const { getOrderInfo, setOrderInfo, removeOrderInfo } = useContext(CheckoutContext);
  const appliedPromoCode = getOrderInfo('promoCode');

  function handleInputChange(e) {
    setValue(e.target.value);
    const match = promoCodeField.isValid(e.target.value);
    setValidCode(match);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (validCode) {
      setOrderInfo('promoCode', validCode);
    }
  }
  
  return (
    !appliedPromoCode ? (
      <form onSubmit={handleSubmit} className="flex ai-end">
        <TextInput
          { ...promoCodeField }
          value={value}
          isValid={validCode ? true : false}
          onChange={handleInputChange}
        />

        <Button main>Aplicar desconto</Button>
      </form>
    ) : (
      <div onClick={() => removeOrderInfo('promoCode')} css={appliedCodeStyles}>
        <p>Código de {appliedPromoCode.rate * 100}% de desconto aplicado!</p>
        <CircleIconContainer styles={removeIconStyles}><Close /></CircleIconContainer>
      </div>
    )
  );
}

export default PromoCodeForm;