// Hooks
import { useState } from 'react';
import useFetchData from '@hooks/useFetchData';
import useForm from '@hooks/useForm';
import useInitializeData from '@hooks/useInitializeData';

// Complements
import Form from '@forms/Form';
import FormHeader from '@forms/FormHeader';
import FormBody from '@forms/FormBody';
import Button from '@buttons/Button';
import EmptyList from '@components/EmptyList';
import ServerError from '@components/ui/ServerError';

// Utilities
import getFieldset from '@utils/getFieldset';
import preventInvalidSubmission from '@utils/preventInvalidSubmission';

// API
import { dbAPI } from '@services/axios';

// Assets
import { Add } from '@mui/icons-material';

const DATA_URL = '/data/card';
const fields = getFieldset('card');

const emptyFields = {};
fields.map(field => emptyFields[field.id] = '');

function MyCards() {
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

  const [ selectedDataId, setSelectedDataId ] = useState('init');
  const [ isAddingData, setIsAddingData ] = useState(false);

  useInitializeData(isLoading, dataList, setFormValues, selectedDataId, setSelectedDataId);

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
        const newData = await dbAPI.post(
          DATA_URL,
          { ...formValues }
        );
        setIsAddingData(false);
        refetch();
        setSelectedDataId(newData.data.id);
        // updates selected data
      } else {
        await dbAPI.put(
          `${DATA_URL}/${selectedDataId ? selectedDataId : dataList[0].id}`,
          { ...formValues }
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
      <EmptyList title="Nenhum cartão salvo">
        <Button main onClick={() => setIsAddingData(true)} icon={<Add />}>Novo cartão</Button>
      </EmptyList>
    );
  }

  return (
    <>
    <h1 className="page-title">Meus cartões</h1>

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
          labelGroup="card"
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

export default MyCards;