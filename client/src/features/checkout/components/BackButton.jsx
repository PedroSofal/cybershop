import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import CheckoutContext from '@checkout/contexts/CheckoutContext';
import SecButton from '@buttons/SecButton';

function BackButton() {
  const navigate = useNavigate();
  const { progress, back } = useContext(CheckoutContext);

  function handleBackButton() {
    if (progress === 1) {
      navigate('/meu-carrinho');
    } else {
      back();
    }
  }

  return (
    <SecButton type="button" onClick={handleBackButton}>Voltar</SecButton>
  );
}

export default BackButton;