// Hooks
import { useContext, useMemo, useState } from 'react';

// Contexts
import CartContext from '@shopping-cart/contexts/CartContext';

// Components
import CartPreview from '@shopping-cart/components/CartPreview';
import CircleIconContainer from '@containers/CircleIconContainer';
import SuspendedOnHover from '../ui/suspended/SuspendedOnHover';

// Assets
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';

// Styles
import { css } from '@emotion/react';

const itemQuantityStyles = css`
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--notification-clr);
  font-size: var(--fs-100) !important;

  & span {
    font-size: var(--fs-100) !important;
  }
`;

function CartNavItem() {
  const { cartItems } = useContext(CartContext);
  const [ quantity, setQuantity ] = useState(null);

  useMemo(() => {
    const sum = cartItems.reduce((acc, product) => Number(product.quantity) + acc, 0);
    setQuantity(sum);
  }, [cartItems]);

  return (
    <SuspendedOnHover
      button={
        <>
        <CircleIconContainer ariaLabel="carrinho de compras"><ShoppingCartIcon /></CircleIconContainer>
        {quantity > 0 &&
          <CircleIconContainer
            styles={itemQuantityStyles}
            ariaLabel={`quantidade de itens no carrinho: ${quantity}`}
            notification="true"
          >
            <span aria-hidden="true">{quantity}</span>
          </CircleIconContainer>
        }
        </>
      }
      content={<CartPreview />}
      contentRole="listbox"
      linkTo="/meu-carrinho"
      contentStyles={css`
        right: 0;
        min-width: min(26rem, 90vw);
      `}
    />
  );
}

export default CartNavItem;