import Button from './ui/buttons/Button';
import SquareNumberInput from '@inputs/SquareNumberInput';
import { Add, Remove } from '@mui/icons-material';
import { css } from '@emotion/react';

function QuantityForm({ quantity, setQuantity, htmlRef, ariaLabelledBy }) {
  function handleIncreaseQuantity() {
    if (quantity < 99) {
      setQuantity(prevQuantity => Number(prevQuantity) + 1);
    }
  }

  function handleDecreaseQuantity() {
    if (quantity > 1) {
      setQuantity(prevQuantity => Number(prevQuantity) - 1);
    }
  }

  function handleQuantityInputChange(e) {
    if (e.target.value > 0 && e.target.value < 100) {
      setQuantity(Number(e.target.value));
    }
  }

  const quantityStyles = css`
    display: flex;

    & > *:last-child {
      order: -1;
    }
  `;

  return (
    <div css={quantityStyles} aria-labelledby={ariaLabelledBy}>
      <SquareNumberInput
        id="quantityInput"
        value={quantity}
        onChange={handleQuantityInputChange}
        htmlRef={htmlRef}
        ariaLabel={`quantidade: ${quantity} unidade${quantity > 1 ? 's' : ''}`}
      />

      <Button
        onClick={handleIncreaseQuantity}
        ariaLabel="acrescentar uma unidade"
        icon={<Add />}
      ></Button>

      <Button
        onClick={handleDecreaseQuantity}
        ariaLabel="subtrair uma unidade"
        icon={<Remove />}
      ></Button>
    </div>
  );
}

export default QuantityForm;