// Hooks
import { useContext, useEffect, useRef } from 'react';

// Components
import Button from '@buttons/Button';
import ConfirmationModal from '@components/modals/ConfirmationModal';

// Utilities
import { createPortal } from "react-dom";

// Styles
import { Delete } from '@mui/icons-material';
import AuthContext from '@authentication/contexts/AuthContext';

function Settings() {
  const dialogRef = useRef();
  const buttonRef = useRef();
  const { deleteAccount } = useContext(AuthContext);

  useEffect(() => {
    buttonRef.current?.focus();
  }, []);

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
        onConfirmation={deleteAccount}
      />,
      document.body
    )}
    </>
  );
}

export default Settings;