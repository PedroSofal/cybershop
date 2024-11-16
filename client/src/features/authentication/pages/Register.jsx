// Hooks
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import useForm from '@hooks/useForm';

// Contexts
import AuthContext from '@authentication/contexts/AuthContext';

// Components
import StandardContainer from '@containers/StandardContainer';
import Form from '@forms/Form';
import FormBody from '@forms/FormBody';
import Button from '@buttons/Button';
import UnderText from '@authentication/components/UnderText';
import { Link } from 'react-router-dom';

// Utilities
import getFieldset from '@utils/getFieldset';
import preventInvalidSubmission from '@utils/preventInvalidSubmission';

// API
import axios from '@services/axios';

const USERS_URL = '/users';
const fields = getFieldset('register');

function Register() {  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const state = { ...location.state }
  
  const { logIn, setIsAuthLoading } = useContext(AuthContext);

  const {
    errRef,
    formValues,
    errMsg,
    setErrMsg,
    success,
    setSuccess,
    isSubmitting,
    setIsSubmitting,
    validations,
    isFormValid,
    handleInputChange
  } = useForm(fields);

  async function handleSubmit(e) {
    e.preventDefault();
    if (preventInvalidSubmission(isFormValid, setErrMsg, errRef)) return;
    
    setIsSubmitting(true);
    setIsAuthLoading(true);

    try {
      const response = await axios.post(
        USERS_URL,
        { username: formValues.username, password: formValues.password }
      );
      
      const { id } = response.data;
      logIn(formValues.username, id);
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Sem resposta do servidor');
      } else if (err.response?.status === 409) {
        setErrMsg('Nome de usuário já existe');
      } else {
        setErrMsg('Erro inesperado');
        console.error(err);
      }
      errRef.current.focus();
    } finally {
      setIsSubmitting(false);
      setIsAuthLoading(false);
    }
  }

  if (success) {
    return (
      <main className="fullscreen-centered" aria-label="registrado com sucesso">
        <StandardContainer>
          <div className="flex-column gap-400">
            <h1 className="section-title">Parabéns!</h1>
            <p>Sua conta foi criada com sucesso.</p>
            <Button main onClick={() => navigate(from, {state: state, replace: true })}>
              {from === '/checkout' ? 'Continuar com o checkout' : 'Ir às compras'}
            </Button>
          </div>
        </StandardContainer>
      </main>
    );
  }

  return (
    <main className="fullscreen-centered gap-400" aria-label="registrar uma conta">
      <h1>Registrar</h1>

      <Form
        onSubmit={handleSubmit}
        errRef={errRef}
        isSubmitting={isSubmitting}
        success={success}
        isFormValid={isFormValid}
        errMsg={errMsg}
        mainAction="Registrar"
        withLogo
      >
        <FormBody
          fields={fields}
          formValues={formValues}
          validations={validations}
          handleInputChange={handleInputChange}
        />
      </Form>

      <UnderText>
        Já possui uma conta? <Link to="/login" state={state}><span>Entrar</span></Link>
      </UnderText>
    </main>
  );
}

export default Register;