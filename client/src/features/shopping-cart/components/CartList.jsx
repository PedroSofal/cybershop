// Hooks
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Contexts
import CartContext from '@shopping-cart/contexts/CartContext';

// Components
import QuantityForm from '@components/QuantityForm';
import ProductImage from '@components/ui/ProductImage';
import Button from '@components/ui/buttons/Button';
import Price from '@components/ui/Price';
import GlassContainer from '@containers/GlassContainer';
import SuspendedOnClick from '@components/ui/suspended/SuspendedOnClick';
import Menu from '@menus/Menu';
import QuantityModal from '@components/QuantityModal';
import ConfirmationModal from '@components/ConfirmationModal';

// Assets
import { Delete, MoreVert } from '@mui/icons-material';

// Styles
import { css } from '@emotion/react';
import mq from '@utils/getMediaQueries';

const gridStyles = (editable) => css`
  --columnNumber: ${editable ? 5 : 4};

  display: grid;
  grid-template-columns: repeat(var(--columnNumber), auto);
  place-items: center;
  gap: var(--ws-300-600);

  .desktop-hidden { display: none; }

  ${mq('tablet')} {
    --columnNumber: 4;

    .desktop-hidden { display: unset; }
    .desktop-only { display: none; }

    font-size: var(--fs-200);
  }
`;

const productNameStyles = css`
  font-size: var(--fs-500);
  font-weight: 700;
  cursor: pointer;
`;

const idStyles = css`
  font-size: var(--fs-400);
`;

const separatorStyles = css`
  grid-column: 1 / -1;
  width: 100%;
`;

function CartList({ editable }) {
  const deleteRef = useRef();
  const navigate = useNavigate();

  const { cartItems, deleteItem } = useContext(CartContext);

  const [ toBeDeleted, setToBeDeleted ] = useState(null);
  const [ toBeFocused, setToBeFocused ] = useState(null);
  
  function handleItemClick(product) {
    navigate(`/produto/${product.id}`);
  }

  function handleDeleteClick(e, product) {
    const clickedListItem = e.target.closest(`#cartItem-${product.id}`);
    const nextItem = clickedListItem.nextSibling;
    const previousItem = clickedListItem.previousSibling;

    if (nextItem) {
      setToBeFocused(nextItem);
    } else if (previousItem) {
      setToBeFocused(previousItem);
    } else {
      setToBeFocused(null);
    }

    setToBeDeleted(product);

    deleteRef.current.showModal();
  }

  function confirmDelete() {
    deleteItem(toBeDeleted.id);

    if (toBeFocused) {
      const h3 = toBeFocused.querySelector('h3');
      h3.focus();
    }
  }

  return (
    <>
    <section>
      <h2 id="section1" className="offscreen">Produtos no carrinho</h2>
      <GlassContainer styles={() => gridStyles(editable)}>
        <header aria-hidden="true" className="display-contents desktop-only">
          <p css={css`grid-column: span 2;`}>Item</p>
          <p>Qtd.</p>
          {editable && <p>Excluir</p>}
          <p>Preço</p>
        </header>
        <hr className="hr-faded desktop-only" css={separatorStyles} />
        <ul className="display-contents" aria-labelledby="section1">
          {cartItems.map((product, index) => (
            <li id={`cartItem-${product.id}`} key={product.id} className="display-contents">
              {index > 0 &&
                <hr className="hr-faded desktop-hidden" css={separatorStyles} />
              }
              <ProductImage
                src={product.image}
                alt={`foto do produto ${product.title}`}
                width="clamp(2.5rem, 1.1957rem + 6.5217vw, 6.25rem)"
                height="clamp(2.5rem, 1.1957rem + 6.5217vw, 6.25rem)"
                padding="var(--ws-200)"
                onClick={() => handleItemClick(product)}
              />
              <div css={css`justify-self: start;`}>
                <h3
                  tabIndex={-1}
                  css={productNameStyles}
                  onClick={() => handleItemClick(product)}
                >
                  {product.title}
                  <span className="desktop-hidden"> ({product.quantity})</span>
                </h3>
                <p
                  css={idStyles}
                  aria-label={`identificador do produto: ${product.id}`}
                  className="text-clr-3"
                >ID do produto: {product.id}</p>
              </div>
              {editable
                ? (
                  <>
                  <div className="desktop-only">
                    <LiveQuantity
                      productId={product.id}
                      productQuantity={product.quantity}
                    />
                  </div>
                  <div className="desktop-only">
                    <Button
                      ariaLabel="excluir produto do carrinho"
                      onClick={(e) => handleDeleteClick(e, product)}
                      icon={<Delete />}
                    ></Button>
                  </div>
                  </>
                ) : (
                  <p
                    aria-label={`quantidade: ${product.quantity} unidade${product.quantity > 1 ? 's' : ''}`}
                  >{product.quantity}</p>
                )
              }
              <Price priceNumber={product.price * product.quantity} />
              <div className="desktop-hidden">
                <MoreOptions
                  product={product}
                  handleItemClick={handleItemClick}
                  handleDeleteClick={handleDeleteClick}
                />
              </div>
            </li>
          ))}
        </ul>
      </GlassContainer>
    </section>

    <ConfirmationModal
      modalId="deleteProductModal"
      htmlRef={deleteRef}
      title={toBeDeleted?.quantity > 1 ? `Excluir ${toBeDeleted?.quantity} produtos?` : 'Excluir produto?'}
      description={
        toBeDeleted?.quantity > 1 ? (
          <>
            Esta ação irá remover {toBeDeleted?.quantity} unidades do produto <span className="bold">{toBeDeleted?.title}</span> do seu carrinho
          </>
        ) : (
          <>
            Esta ação irá remover o produto <span className="bold">{toBeDeleted?.title}</span> do seu carrinho
          </>
        )
      }      
      mainAction={toBeDeleted?.quantity > 1 ? `Excluir todos` : 'Excluir'}
      onConfirmation={confirmDelete}
    />
    </>
  );
}

function LiveQuantity({ productId, productQuantity }) {
  const [ newQuantity, setNewQuantity ] = useState(productQuantity);
  const { changeQuantity } = useContext(CartContext);

  useEffect(() => {
    if (newQuantity !== productQuantity) { // prevents first render
      changeQuantity(productId, newQuantity);
    }
  }, [newQuantity]);

  return (
    <QuantityForm quantity={newQuantity} setQuantity={setNewQuantity} />
  );
}

function MoreOptions({ product, handleItemClick, handleDeleteClick }) {
  const quantityRef = useRef();

  return (
    <>
    <SuspendedOnClick
      button={<MoreVert />}
      content={
        <Menu list={[
          { text: 'Ver produto', action: () => handleItemClick(product) },
          { text: 'Alterar quantidade', action: () => quantityRef.current.showModal() },
          { text: 'Remover produto', action: (e) => handleDeleteClick(e, product) },
        ]} />
      }
      contentStyles={css`right: 0; min-width: 12rem;`}
      contentRole="menu"
      contentLabel="opções"
    />
    <QuantityModal htmlRef={quantityRef} product={product} />
    </>
  );
}

export default CartList;