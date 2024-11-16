// Hooks
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';

// Contexts
import AuthContext from '@authentication/contexts/AuthContext';
import CartContext from '@shopping-cart/contexts/CartContext';

// Components
import Button from '@buttons/Button';
import ConfirmationModal from '@components/ConfirmationModal';
import ServerError from '@components/ui/ServerError';

// Utilities
import { createPortal } from "react-dom";

// API
import axios from '@services/axios';

// Styles
import { Delete } from '@mui/icons-material';

const USERS_URL = '/users';

function Settings() {
  const dialogRef = useRef();
  const buttonRef = useRef();
  const navigate = useNavigate();
  const { auth, logOut } = useContext(AuthContext);
  const { clearCart } = useContext(CartContext);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    buttonRef.current?.focus();
  }, []);

  async function handleDeleteAccount() {
    try {
      await axios.delete(`${USERS_URL}/${auth.id}`);
      clearCart();
      logOut();
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(true);
    }
  }
  
  if (error) return <ServerError />

  return (
    <>
    <h1 className="page-title">Configurações da conta</h1>
    
    <Button
      htmlRef={buttonRef}
      onClick={() => dialogRef.current.showModal()}
      icon={<Delete />}
    >Excluir Conta</Button>

    {createPortal(
      <ConfirmationModal
        modalId="deleteAccountModal"
        htmlRef={dialogRef}
        title='Excluir conta?'
        description='Você perderá todos os dados salvos e registros de pedidos, e o carrinho de compras será esvaziado. Esta ação é permanente.'
        mainAction='Excluir'
        onConfirmation={handleDeleteAccount}
      />,
      document.body
    )}
    </>
  );
}

export default Settings;