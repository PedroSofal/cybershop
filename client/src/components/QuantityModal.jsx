import CartContext from '@shopping-cart/contexts/CartContext';
import MainButton from '@buttons/MainButton';
import SecButton from '@buttons/SecButton';
import QuantityForm from '@components/QuantityForm';
import { css } from '@emotion/react';
import { useContext, useState } from 'react';

const containerStyles = css`
  display: flex;
  flex-direction: column;
  min-width: min(30rem, 90vw);
  border-radius: var(--border-radius);
  border-top: 4px solid var(--brand-clr-1);

  & .modal-section {
    padding: var(--ws-400);
  }
`;

function QuantityModal({ htmlRef, product }) {
  const [ quantity, setQuantity ] = useState(1);
  const { confirmQuantity } = useContext(CartContext);

  function handleQuantityConfirmation() {
    confirmQuantity(product, quantity);
    setQuantity(1);
    htmlRef.current.close();
  }

  function handleCancel() {
    setQuantity(1);
    htmlRef.current.close();
  }

  return (
    <dialog
      ref={htmlRef}
      aria-labelledby="modalTitle"
      aria-describedby="modalDesc"
      aria-modal="true"
    >
      <div className="elv" css={containerStyles}>
        <h1
          id="modalTitle"
          className="modal-section"
          css={css`font-size: var(--fs-800);`}
        >Selecione a quantidade</h1>
        <hr className="faded" />
        <div className="modal-section | flex ai-center jc-center gap-100">
          <QuantityForm
            quantity={quantity}
            setQuantity={setQuantity}
            ariaLabelledBy="addToCartBtn"
          />
        </div>
        <hr className="faded" />
        <div className="flex jc-end gap-200 | modal-section" aria-label="ações da caixa de diálogo">
          <SecButton onClick={handleCancel}>Cancelar</SecButton>
          <MainButton
            onClick={handleQuantityConfirmation}
            ariaLabel="confirmar quantidade e enviar produto ao carrinho"
          >OK</MainButton>
        </div>
      </div>
    </dialog>
  );
}

export default QuantityModal;