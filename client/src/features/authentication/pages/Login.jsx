// Hooks
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useContext} from 'react';
import useForm from '@hooks/useForm';

// Contexts
import AuthContext from '@authentication/contexts/AuthContext';

// Components
import Form from '@forms/Form';
import FormBody from '@forms/FormBody';
import UnderText from '@authentication/components/UnderText';
import { Link } from 'react-router-dom';

// Utilities
import getFieldset from '@utils/getFieldset';
import preventInvalidSubmission from '@utils/preventInvalidSubmission';

// API
import { dbAPI } from '@services/axios';

const fields = getFieldset('login');

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const state = { ...location.state }
  
  const { token, logIn, setIsAuthLoading } = useContext(AuthContext);

  const {
    errRef,
    formValues,
    errMsg,
    setErrMsg,
    isSubmitting,
    setIsSubmitting,
    validations,
    isFormValid,
    handleInputChange
  } = useForm(fields);

  async function handleSubmit(e) {
    e.preventDefault();
    if (preventInvalidSubmission(isFormValid, setErrMsg, errRef)) return;

    const username = formValues.username;
    const password = formValues.password;

    setIsSubmitting(true);
    setIsAuthLoading(true);

    try {
      const response = await dbAPI.post(
        '/auth/login',
        { username: username, password: password }
      );

      if (response.status === 200) {
        logIn(username, password);
        navigate(from, {state: state, replace: true });
      } else {
        setErrMsg('Erro inesperado');
      }
    } catch (error) {
      if (!error.response) {
        setErrMsg('Sem resposta do servidor');
      } else if (error.response?.status === 401) {
        setErrMsg('Preencha todos os campos');
      } else if (error.response?.status === 403) {
        setErrMsg('Usuário ou senha inválidos');
      } else {
        setErrMsg('Erro inesperado');
      }
      errRef.current.focus();
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setIsAuthLoading(false);
    }
  }
  
  return (
    token
      ? <Navigate to="/" />
      : (
        <main className="fullscreen-centered gap-400" aria-label="fazer login">
          <h1>Entrar</h1>

          <Form
            onSubmit={handleSubmit}
            errRef={errRef}
            isSubmitting={isSubmitting}
            isFormValid={isFormValid}
            errMsg={errMsg}
            mainAction="Entrar"
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
            Ainda não possui uma conta? <Link to='/register' state={state}><span>Registre-se</span></Link>
          </UnderText>
        </main>
      )
  );
}

export default Login;