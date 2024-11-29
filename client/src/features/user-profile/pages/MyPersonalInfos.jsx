// Hooks
import useFetchData from '@hooks/useFetchData';
import useForm from '@hooks/useForm';
import useInitializeData from '@hooks/useInitializeData';

// Components
import Form from '@components/ui/form/Form';
import FormBody from '@components/ui/form/FormBody';
import ServerError from '@components/ui/ServerError';

// Utilities

import getFieldset from '@utils/getFieldset';
import preventInvalidSubmission from '@utils/preventInvalidSubmission';

// API
import { dbAPI } from '@services/axios';

const DATA_URL = '/data/personal';
const fields = getFieldset('personal');

const gridAreas = `
  'firstName lastName'
  'email email'
  'tel1 tel2'
`;

function MyPersonalInfos() {
  const { dataList, isLoading, error, refetch } = useFetchData(DATA_URL);

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
        await dbAPI.post(
          DATA_URL,
          { ...formValues }
        );
      // updates personal info data
      } else {
        await dbAPI.put(
          `${DATA_URL}/${dataList[0].id}`,
          { ...formValues }
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
        gridAreas={gridAreas}
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