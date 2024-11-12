// Hooks
import { useContext, useState } from 'react';
import useFetchData from '@hooks/useFetchData';
import useForm from '@hooks/useForm';
import useInitializeData from '@hooks/useInitializeData';
import useHandleGenericInputChange from '@hooks/useHandleGenericInputChange';
import useHandleZipCodeChange from '@hooks/useHandleZipCodeChange';

// Contexts
import AuthContext from '@authentication/contexts/AuthContext';

// Complements
import Form from '@forms/Form';
import FormHeader from '@forms/FormHeader';
import FormBody from '@forms/FormBody';
import MainButton from '@buttons/MainButton';
import EmptyList from '@components/EmptyList';
import ServerError from '@components/ui/ServerError';

// Utilities
import getFieldset from '@utils/getFieldset';
import preventInvalidSubmission from '@utils/preventInvalidSubmission';

// API
import axios from '@services/axios';

// Assets
import { Add } from '@mui/icons-material';

const DATA_URL = '/address-data';
const fields = getFieldset('address');

const emptyFields = {};
fields.map(field => emptyFields[field.id] = '');

function MyAddresses() {
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
    isFormValid
  } = useForm(fields);

  const [ selectedDataId, setSelectedDataId ] = useState('');
  const [ isAddingData, setIsAddingData ] = useState(false);

  const { handleGenericInputChange } = useHandleGenericInputChange();
  const { handleZipCodeChange } = useHandleZipCodeChange();

  useInitializeData(isLoading, dataList, setFormValues, selectedDataId, setSelectedDataId);

  function handleInputChange(e, autoFormat) {
    handleGenericInputChange(e, autoFormat, setFormValues, setSuccess, setErrMsg);
    handleZipCodeChange(e, autoFormat, setFormValues, fields);
  }

  function handleCancel() {
    setIsAddingData(false);
    refetch();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (preventInvalidSubmission(isFormValid, setErrMsg, errRef)) return;
    
    setIsSubmitting(true);

    try {
      // posts new data if the user is creating a new one
      if (isAddingData) {
        const newData = await axios.post(
          DATA_URL,
          { ...formValues, userId: auth.id }
        );
        setIsAddingData(false);
        refetch();
        setSelectedDataId(newData.data.id);
        // updates selected data
      } else {
        await axios.put(
          `${DATA_URL}/${selectedDataId ? selectedDataId : dataList[0].id}`,
          { ...formValues, userId: auth.id }
        );
        refetch();
      }
      setSuccess(true);
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

  if (error) return <ServerError />

  if (dataList.length === 0 && !isAddingData && !isLoading) {
    return (
      <EmptyList title="Nenhum endereço salvo">
        <MainButton onClick={() => setIsAddingData(true)} icon={<Add />}>+ Novo endereço</MainButton>
      </EmptyList>
    );
  }

  return (
    <>
    <h1 className="page-title">Meus endereços</h1>

    <div className="flex-column gap-400">
      {!isAddingData &&
        <FormHeader
          dataUrl={`${DATA_URL}/${selectedDataId}`}
          dataList={dataList}
          selectedDataId={selectedDataId}
          setSelectedDataId={setSelectedDataId}
          isLoading={isLoading}
          refetch={refetch}
          setFormValues={setFormValues}
          setIsAddingData={setIsAddingData}
          emptyFields={emptyFields}
          labelGroup="address"
        />
      }

      <Form
        onSubmit={handleSubmit}
        errRef={errRef}
        isLoading={isLoading}
        isSubmitting={isSubmitting}
        success={success}
        isFormValid={isFormValid}
        errMsg={errMsg}
        onCancel={isAddingData && handleCancel}
        autoFocus={false}
      >
        <FormBody
          fields={fields}
          formValues={formValues}
          validations={validations}
          handleInputChange={handleInputChange}
        />
      </Form>
    </div>
    </>
  );
}

export default MyAddresses;