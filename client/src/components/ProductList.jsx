// Hooks
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

// Components
import ProductImage from '@components/ui/ProductImage';
import Price from '@components/ui/Price';
import Button from '@buttons/Button';
import QuantityModal from '@components/QuantityModal';

// Utilities
import { createPortal } from "react-dom";

// Styles
import { css } from '@emotion/react';

const cardStyles = css`
  display: grid;
  border-radius: var(--border-radius);
  container: card / inline-size;

  &:hover, &:has(h2:focus), &:has(h3:focus) {
    outline: 2px solid var(--accent-dp-0);
  }

  & > div {
    padding: var(--ws-400);
  }
`;

const titleStyles = css`
  display: -webkit-box;
  height: calc(var(--fs-400) * 3 + var(--ws-500));
  font-size: var(--fs-400);
  font-weight: 400;
  line-height: var(--ws-500);
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  overflow: hidden;
  color: var(--text-clr-2);
  cursor: pointer;
`;

function ProductList({ products, withAddToCart }) {
  const quantityRef = useRef();
  const navigate = useNavigate();
  const [ selectedProduct, setSelectedProduct ] = useState();

  const grid = withAddToCart
    ? css`grid-template-columns: repeat(auto-fit, minmax(clamp(10.625rem, 9.538rem + 5.4348vw, 13.75rem), 1fr));`
    : css`grid-template-columns: repeat(auto-fit, minmax(10.625rem, 1fr));`
  ;

  const TitleTag = withAddToCart ? 'h2' : 'h3';

  function openQuantityModal(product) {
    setSelectedProduct(product);
    quantityRef.current.showModal();
  }

  return (
    <>
    <ul className="grid gap-400" css={grid}>
      {products.map(product => (
        <li
          key={product.id}
          className="elv"
          css={cardStyles}
        >
          <ProductImage
            src={product.image}
            alt={`foto do produto ${product.title}`}
            height="240px"
            onClick={() => navigate(`/produto/${product.id}`)}
          />
          <div className="flex-column gap-400">
            <TitleTag
              title={product.title}
              css={titleStyles}
              onClick={() => navigate(`/produto/${product.id}`)}
              tabIndex={0}
            >
              {product.title}
            </TitleTag>
            <Price priceNumber={product.price} />

            {withAddToCart &&
              <Button
                id="addToCartBtn"
                onClick={() => openQuantityModal(product)}
                >Adicionar ao carrinho</Button>
            }
          </div>
        </li>
      ))}
    </ul>
    
    {createPortal(
      <QuantityModal htmlRef={quantityRef} product={selectedProduct} />,
      document.body
    )}
    </>
  );
}

export default ProductList;