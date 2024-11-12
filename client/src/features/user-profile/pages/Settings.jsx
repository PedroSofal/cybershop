// Hooks
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';

// Contexts
import AuthContext from '@authentication/contexts/AuthContext';

// Components
import SecButton from '@buttons/SecButton';
import ConfirmationModal from '@components/ConfirmationModal';
import ServerError from '@components/ui/ServerError';

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
  const [ error, setError ] = useState(false);

  useEffect(() => {
    buttonRef.current?.focus();
  }, []);

  async function handleDeleteAccount() {
    try {
      await axios.delete(`${USERS_URL}/${auth.id}`);
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
    
    <SecButton
      htmlRef={buttonRef}
      onClick={() => dialogRef.current.showModal()}
      icon={<Delete />}
    >Excluir Conta</SecButton>

    <ConfirmationModal
      modalId="deleteAccountModal"
      htmlRef={dialogRef}
      title='Excluir conta?'
      description='Você perderá todos os seus dados e registros de pedidos. Esta ação é permanente.'
      mainAction='Excluir'
      onConfirmation={handleDeleteAccount}
    />
    </>
  );
}

export default Settings;