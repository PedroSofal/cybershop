// Hooks
import { Link, useNavigate } from 'react-router-dom';

// Components
import Price from '@components/ui/Price';
import ProductImage from '@components/ui/ProductImage';

// Utilities
import formatPriceToBRL from '@utils/formatPriceToBRL';

// Styles
import { css } from '@emotion/react';

const itemStyles = css`
  display: flex;
  gap: var(--ws-400);
  align-items: start;
  padding: var(--ws-400);
  border-radius: var(--border-radius);
  cursor: pointer;
`;

const seeMoreStyles = css`
  padding: var(--ws-400);
  font-size: var(--fs-500);
  text-align: center;
  color: var(--link-clr);
  text-decoration: underline;
  cursor: auto;
`;

function ProductListMin({ products, ariaLabel, limit = 5, seeMoreText, seeMoreLink }) {
  const navigate = useNavigate();
  
  function handleItemClick(product) {
    navigate(`/produto/${product.id}`);
  }
  
  return (
    <>
    <ul aria-label={ariaLabel} role="listbox">
      {products.map((product, index) => (
        index < limit && (
          <li
            key={product.id}
            className="elv-hover"
            css={itemStyles}
            onClick={() => handleItemClick(product)}
            aria-labelledby="productLabel"
          >
            <span id="productLabel" className="offscreen">
              {product.title}.
              Quantidade: {product.quantity}.
              Valor: {formatPriceToBRL(product.price * (product.quantity || 1), true)}
            </span>

            <ProductImage
              ariaHidden={true}
              src={product.image}
              alt=""
              width="4.5rem"
              height="4.5rem"
              padding="var(--ws-200)"
              onClick={() => navigate(`/product/${product.id}`)}
            />
            <div aria-hidden="true">
              <p>
                {product.title}
                {product.quantity && <span> ({product.quantity})</span>}
              </p>
              <Price
                priceNumber={product.price * (product.quantity || 1)}
                small={true}
              />
            </div>
          </li>
        )
      ))}
    </ul>
    <hr className="hr-faded" css={css`margin-inline: var(--ws-400);`} />
    <div css={seeMoreStyles}>
      <Link to={seeMoreLink}>{seeMoreText}</Link>
    </div>
    </>
  );
}

export default ProductListMin;