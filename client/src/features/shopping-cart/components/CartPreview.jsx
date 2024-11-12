// Hooks
import { useContext } from 'react';

// Contexts
import CartContext from '@shopping-cart/contexts/CartContext';

// Components
import EmptyPreview from '@components/ui/EmptyPreview';
import ProductListMin from '@components/ProductListMin';

function CartPreview() {
  const { cartItems } = useContext(CartContext);

  return (
    (cartItems.length === 0
      ? (
        <EmptyPreview>
          <p>Seu carrinho está vazio</p>
        </EmptyPreview>
      ) : (
        <ProductListMin
          products={cartItems}
          seeMoreText="Ver Carrinho"
          seeMoreLink="/meu-carrinho"
        />
      )
    )
  );
}

export default CartPreview;