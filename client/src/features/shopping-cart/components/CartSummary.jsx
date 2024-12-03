// Hooks
import { useContext } from 'react';
import useCalcPriceFractions from '@hooks/useCalcPriceFractions';

// Contexts
import CartContext from '@shopping-cart/contexts/CartContext';

// Utilities
import formatPriceToBRL from '@utils/formatPriceToBRL';

// Styles
import { css } from '@emotion/react';
import mq from '@utils/getMediaQueries';

const summaryListStyles = css`
  display: flex;
  justify-content: center;
  gap: var(--ws-400);
  flex-wrap: wrap;

  li {
    display: flex;
    align-items: center;
    gap: var(--ws-400);
    width: fit-content;
    border: 1px solid var(--bg-dp-24);
    border-radius: var(--border-radius);
    padding: var(--ws-400-500);
  }

  ${mq('mobile')} {
    flex-direction: column;
    flex-wrap: nowrap;

    li {
      border: none;
      padding: 0;
    }
  }
`;

const priceStyles = (bold) => css`
  font-weight: ${bold ? 600 : 400};
  border-radius: var(--border-radius);
  padding: var(--ws-200) var(--ws-400);
`;

function CartSummary({ deliveryMethod }) {
  const { cartItems } = useContext(CartContext);
  const { subtotal, discount, freight, total } = useCalcPriceFractions(cartItems, deliveryMethod);
  
  const formattedSubtotal = formatPriceToBRL(subtotal, true);
  const formattedDiscount = formatPriceToBRL(discount);
  const formattedFreight = formatPriceToBRL(freight);
  const formattedTotal = formatPriceToBRL(total);

  return (
    <section aria-labelledby="priceSummary">
      <h2 id="priceSummary" className="offscreen">Composição do Preço</h2>
      <ul css={summaryListStyles}>
        <li>
          <PriceFraction label="Subtotal:" value={formattedSubtotal} />
        </li>
        <li>
          <PriceFraction label="Desconto:" value={formattedDiscount} />
        </li>
        <li>
          <PriceFraction label="Frete:" value={formattedFreight} />
        </li>
        <li>
          <PriceFraction label="Total:" value={formattedTotal} bold={true} />
        </li>
      </ul>
    </section>
  );
}

function PriceFraction({ label, value, bold }) {
  return (
    <p className="flex ai-center gap-400">
      <span className="text-clr-2"
      >{label}</span>
      
      <span className="elv" css={() => priceStyles(bold)}
      >{value}</span>
    </p>
  );
}

export default CartSummary;