import { useNavigate } from 'react-router-dom';
import { useContext, useRef } from 'react';
import { createPortal } from 'react-dom';
import AuthContext from '@authentication/contexts/AuthContext';
import CartContext from '@shopping-cart/contexts/CartContext';
import ConfirmationModal from '@components/ConfirmationModal';
import Menu from '@menus/Menu';

function UserPreview() {
  const navigate = useNavigate();
  const dialogRef = useRef();

  const { clearCart } = useContext(CartContext);
  const { auth, logOut } = useContext(AuthContext);

  function handleLogOutClick() {
    dialogRef.current.close();
    navigate('/');
    clearCart();
    logOut();
  }

  return (
    <>
    {auth ? (
      <Menu list={[
        { text: 'Minha conta', action: () => navigate('/perfil') },
        { text: 'Meus pedidos', action: () => navigate('/perfil/pedidos') },
        { text: 'Sair', action: () => dialogRef.current.showModal() },
      ]} />
    ) : (
      <Menu list={[
        { text: 'Entrar', action: () => navigate('/login') },
        { text: 'Cadastrar-se', action: () => navigate('/register') },
      ]} />
    )}

    {createPortal(
      <ConfirmationModal
        modalId="logoutModal"
        htmlRef={dialogRef}
        title='Fazer logout?'
        description='Você será desconectado da sua conta.'
        mainAction='Logout'
        onConfirmation={handleLogOutClick}
      />,
      document.body
    )}
    </>
  );
}

export default UserPreview;