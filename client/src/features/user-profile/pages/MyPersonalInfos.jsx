// Hooks
import { useContext } from 'react';
import useFetchData from '@hooks/useFetchData';
import useForm from '@hooks/useForm';
import useInitializeData from '@hooks/useInitializeData';

// Contexts
import AuthContext from '@authentication/contexts/AuthContext';

// Components
import Form from '@forms/Form';
import FormBody from '@forms/FormBody';
import ServerError from '@components/ui/ServerError';

// Utilities

import getFieldset from '@utils/getFieldset';
import preventInvalidSubmission from '@utils/preventInvalidSubmission';

// API
import axios from '@services/axios';

const DATA_URL = '/personal-data';
const fields = getFieldset('personal');

function MyPersonalInfos() {
  const { auth } = useContext(AuthContext);
  const { dataList, isLoading, error, refetch } = useFetchData(`${DATA_URL}?userId=${auth.id}`);

  const {
    errRef,
    formValues,
    setFormValues,
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

  useInitializeData(isLoading, dataList, setFormValues);

  async function handleSubmit(e) {
    e.preventDefault();
    if (preventInvalidSubmission(isFormValid, setErrMsg, errRef)) return;
    
    setIsSubmitting(true);

    try {
      // posts personal info data for the first time
      if (dataList.length === 0) {
        await axios.post(
          DATA_URL,
          { ...formValues, userId: auth.id }
        );
      // updates personal info data
      } else {
        await axios.put(
          `${DATA_URL}/${dataList[0].id}`,
          { ...formValues, userId: auth.id }
        );
      }
      setSuccess(true);
      refetch();
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Sem resposta do servidor');
      } else {
        setErrMsg('Erro inesperado');
      }
      errRef.current.focus();
    } finally {
      setIsSubmitting(false);
    }
  }

  if (error) return <ServerError />;

  return (
    <>
    <h1 className="page-title">Informações pessoais</h1>

    <Form
      onSubmit={handleSubmit}
      errRef={errRef}
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      success={success}
      isFormValid={isFormValid}
      errMsg={errMsg}
    >
      <FormBody
        fields={fields}
        formValues={formValues}
        validations={validations}
        handleInputChange={handleInputChange}
      />
    </Form>
    </>
  );
}

export default MyPersonalInfos;