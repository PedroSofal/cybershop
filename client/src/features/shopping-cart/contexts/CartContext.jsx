import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from '@services/axios';
import AuthContext from '@authentication/contexts/AuthContext';
import CartSelectModal from '@shopping-cart/components/CartSelectModal';
import debounce from 'lodash.debounce';

const DATA_URL = '/carts';

const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  confirmQuantity: () => {},
  changeQuantity: () => {},
  deleteItem: () => {},
  setCartItems: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }) {
  const { auth, isAuthLoading } = useContext(AuthContext);
  const [ cartItems, setCartItems ] = useState([]);
  const [ cartConflict, setCartConflict ] = useState(null);

  function addToCart(product) {
    const newItemsArray = sortCartItems([...cartItems, product]);
    setCartItems(newItemsArray);
  }

  function confirmQuantity(product, quantity) {
    const itemAlreadyInCart = cartItems.find(item => item.id === product.id);
    if (itemAlreadyInCart) {
      changeQuantity(product.id, itemAlreadyInCart.quantity + quantity);
    } else {
      addToCart({
        ...product,
        quantity: quantity,
      });
    }
  }

  function changeQuantity(productId, newQuantity) {
    const cartItemsWithoutItemToBeEdited = cartItems.filter(item => item.id !== productId);
    const editedProduct = cartItems.find(item => item.id === productId);
    editedProduct.quantity = newQuantity;
    const newItemsArray = sortCartItems([...cartItemsWithoutItemToBeEdited, editedProduct]);
    setCartItems(newItemsArray);
  }

  function deleteItem(productId) {
    const cartItemsWithoutItemToBeRemoved = cartItems.filter(item => item.id !== productId);
    const newItemsArray = sortCartItems([...cartItemsWithoutItemToBeRemoved]);
    setCartItems(newItemsArray);
  }
  
  function clearCart() {
    setCartItems([]);
  }

  function sortCartItems(cartItemsArray) {
    return cartItemsArray.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
  
      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
      return 0;
    });
  }

  async function fetchUserCart(sessionCartString, sessionCartArray) {
    // console.log('fetching user cart from database');

    try {
      const response = await axios.get(`${DATA_URL}?userId=${auth.id}`);
      const existingCart = response.data[0];

      if (!existingCart) {
        // there's no cart saved in user's account, so use the cart found in session storage, or an empty one
        setCartItems(sessionCartArray);
        // console.log('negative on user cart: ', cartItems);
        return;
      }

      const databaseCartString = JSON.stringify(existingCart.items);
      const conflictBetweenCarts = sessionCartArray.length > 0 && databaseCartString !== sessionCartString;

      if (conflictBetweenCarts) {
        // the cart found in user's account differs from the one he was just using, so mark it as a conflict
        setCartConflict([sessionCartArray, existingCart.items]);
        // console.log('conflict detected', sessionCartArray);
      } else {
        // use the cart found in user's account
        setCartItems(existingCart.items);
        // console.log('user cart set as cartItems: ', existingCart.items);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const updateDatabaseCart = useMemo(
    () => debounce(async (newCartString) => {
      if (isAuthLoading) return;
      // console.log('updating database cart');

      try {
        const response = await axios.get(`${DATA_URL}?userId=${auth.id}`);
        const existingCart = response.data[0];

        if (!existingCart && cartItems.length === 0) {
          // there are zero items to be placed in the user's cart and there's no cart to be deleted
          // console.log('no changes detected');
          return;
        }
        
        if (!existingCart && cartItems.length > 0) {
          // there's no cart saved in user's account, so create one with the new items
          await axios.post(DATA_URL, { userId: auth.id, items: cartItems });
          // console.log('created cart in database: ', cartItems);
          return;
        }

        const databaseCartString = JSON.stringify(existingCart.items);
        const newCartContainsChanges = databaseCartString !== newCartString;
        
        if (newCartContainsChanges && cartItems.length > 0) {
          // update user's cart with the new items
          await axios.put(`${DATA_URL}/${existingCart.id}`, { userId: auth.id, items: cartItems });
          // console.log('edited cart in database: ', cartItems);
          return;
        }
        
        if (newCartContainsChanges  && cartItems.length === 0) {
          // delete user's cart since there are zero items to be placed in it
          await axios.delete(`${DATA_URL}/${existingCart.id}`);
          // console.log('deleted cart in database');
          return;
        }

        // console.log('no changes detected');
      } catch (error) {
        console.error(error);
      }  
    }, 500),
    [cartItems]
  );
  
  useEffect(() => {
    // console.log('---FIRST EFFECT: GET DATA---');
    if (isAuthLoading) return;
    
    const sessionCartString = sessionStorage.getItem('cartItems');
    const sessionCartArray = JSON.parse(sessionCartString || '[]');

    if (auth?.id) {
      // the user is logged in, so search for a cart saved in his account
      fetchUserCart(sessionCartString, sessionCartArray);
    } else {
      // the user is a guest, so use the cart found in session storage, or an empty one
      setCartItems(sessionCartArray);
      // console.log('got session storage cart: ', sessionCartArray);
    }
  }, [isAuthLoading]);

  useEffect(() => {
    // console.log('---SECOND EFFECT: SET DATA---');
    if (isAuthLoading || cartConflict) return;

    // the current cart items were successfully updated, so store them in session storage
    const newCartString = JSON.stringify(cartItems);
    sessionStorage.setItem('cartItems', newCartString);
    // console.log('set cart items in session storage: ', cartItems);

    if (auth?.id) {
      // the user is logged in, so also update the database
      updateDatabaseCart(newCartString);
    }
  }, [cartItems]);

  function setPreferredCart(cartType) {
    if (cartType === 'database') {
      setCartItems(cartConflict[1]);
      sessionStorage.setItem('cartItems', JSON.stringify(cartConflict[1]));
    } else {
      setCartItems(cartConflict[0]);
    }
    setCartConflict(null);
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      confirmQuantity,
      changeQuantity,
      deleteItem,
      setCartItems,
      clearCart
    }}>
      {children}
      {cartConflict && <CartSelectModal onSelect={setPreferredCart} conflict={cartConflict} />}
    </CartContext.Provider>
  )
}

export default CartContext;