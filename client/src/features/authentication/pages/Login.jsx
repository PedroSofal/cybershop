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
import axios from '@services/axios';

const USERS_URL = '/users';
const fields = getFieldset('login');

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const state = { ...location.state }
  
  const { auth, logIn, setIsAuthLoading } = useContext(AuthContext);

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

    setIsSubmitting(true);
    setIsAuthLoading(true);

    try {
      const response = await axios.get(USERS_URL);
      console.log(response)
      const user = response.data.find(user => {
        return user.username === formValues.username && user.password === formValues.password;
      });
      
      if (user) {
        logIn(user.username, user.id);
        navigate(from, {state: state, replace: true });
      } else {
        setErrMsg('Usuário ou senha inválidos');
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Sem resposta do servidor');
      } else if (err.response?.status === 400 || err.response?.status === 401) {
        setErrMsg('Preencha todos os campos');
      } else {
        setErrMsg('Erro inesperado');
      }
      errRef.current.focus();
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setIsAuthLoading(false);
    }
  }
  
  return (
    auth?.id
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