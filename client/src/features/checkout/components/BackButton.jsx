import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import CheckoutContext from '@checkout/contexts/CheckoutContext';
import Button from '@buttons/Button';

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
    <Button type="button" onClick={handleBackButton}>Voltar</Button>
  );
}

export default BackButton;