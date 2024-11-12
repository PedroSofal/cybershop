import { useContext, useState } from 'react';
import CheckoutContext from '@checkout/contexts/CheckoutContext';
import TextInput from '@inputs/TextInput';
import MainButton from '@buttons/MainButton';
import promoCodes from '@data/promoCodes';
import { css } from '@emotion/react';

const appliedCodeStyles = css`
  position: relative;
  padding: var(--ws-200) var(--ws-400);
  border-radius: var(--border-radius);
  font-size: var(--fs-500);
  background-color: var(--discount-clr-2);
  cursor: pointer;

  &::after {
    content: 'X';
    display: grid;
    place-content: center;
    position: absolute;
    width: 25px;
    height: 25px;
    right: -0.7rem;
    top: -0.5rem;
    border-radius: 50%;
    font-size: 0.8rem;
    background-color: var(--error-clr);
    visibility: hidden;
  }

  &:hover {
    background-color: hsl(from var(--error-clr) h s calc(l + 10) / 0.3);
  }

  &:hover&::after {
    visibility: visible;
  }
`;

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

        <MainButton>Aplicar desconto</MainButton>
      </form>
    ) : (
      <div onClick={() => removeOrderInfo('promoCode')} css={appliedCodeStyles}>
        <p>Código de {appliedPromoCode.rate * 100}% de desconto aplicado!</p>
      </div>
    )
  );
}

export default PromoCodeForm;