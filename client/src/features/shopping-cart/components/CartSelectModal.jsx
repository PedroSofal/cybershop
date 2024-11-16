import { useEffect, useRef, useState } from 'react';
import Button from '@buttons/Button';
import PhotoGallery from '@components/ui/PhotoGallery';
import { css } from '@emotion/react';

const containerStyles = css`
  width: min(32rem, 90vw);
  border-radius: var(--border-radius);
  border-top: 4px solid var(--brand-clr-1);

  & .modal-section {
    padding: var(--ws-400);
  }
`;

const titleStyles = css`
  font-size: var(--fs-800);
`;

const labelStyles = css`
  border-radius: var(--border-radius);
  padding: var(--ws-300);
  cursor: pointer;

  &:has(input:checked) {
    outline: 2px solid var(--accent-dp-0);
  }
`;

const hiddenRadioStyles = css`
  position: fixed;
  opacity: 0;
  pointer-events: none;
`;

const galleryStyles = css`
  padding: var(--ws-200-400);
  border-radius: var(--border-radius);
  background-color: white;
`;

function CartSelectModal({ onSelect, conflict }) {
  const dialogRef = useRef();
  const [ selectedCart, setSelectedCart ] = useState('session');

  useEffect(() => {
    dialogRef?.current.showModal();
    dialogRef?.current.focus();
  }, []);

  function handleSelection() {
    onSelect(selectedCart);
    dialogRef.current.close();
  }

  return (
    <dialog ref={dialogRef}>
      <div className="elv" css={containerStyles}>
        <section className="modal-section">
          <h1 css={titleStyles}>Conflito de carrinhos.</h1>
        </section>
        <hr className="hr-faded" />
        <section className="modal-section">
          <p>Encontramos um carrinho salvo em sua conta. Escolha se deseja recuperá-lo ou continuar usando o carrinho atual.</p>
        </section>
        <hr className="hr-faded" />
        <section className="flex jc-evenly | modal-section">
          {conflict.map((cartItems, index) => (
            <label key={index} className="flex-column gap-200" css={labelStyles}>
              <div css={galleryStyles}>
                <PhotoGallery size="min(10vw, 70px)">
                  {cartItems.map((product, index) => (
                    index < 4 && <img key={index} src={product.image} alt="" />
                  ))}
                </PhotoGallery>
              </div>
              <div className="text-center">
                <p className="bold">{index === 0 ? 'Carrinho atual' : 'Carrinho salvo'}</p>
                <p className="text-clr-3">{cartItems.length} produto{cartItems.length > 1 ? 's' : ''}</p>
              </div>
              <input
                type="radio"
                name="cart"
                value={index === 0 ? 'session' : 'database'}
                checked={selectedCart === (index === 0 ? 'session' : 'database')}
                onChange={(e) => setSelectedCart(e.target.value)}
                css={hiddenRadioStyles}
              />
            </label>
          ))}
        </section>
        <hr className="hr-faded" />
        <section className="flex jc-end gap-200 | modal-section">
          <Button main onClick={handleSelection}>Aplicar carrinho escolhido</Button>
        </section>
      </div>
    </dialog>
  );
}

export default CartSelectModal;