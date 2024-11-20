// Hooks
import { useRef, useState } from 'react';
import useFetchData from '@hooks/useFetchData';
import useForm from '@hooks/useForm';
import useInitializeData from '@hooks/useInitializeData';
import useHandleGenericInputChange from '@hooks/useHandleGenericInputChange';
import useHandleZipCodeChange from '@hooks/useHandleZipCodeChange';

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

// Styles
import { CSSTransition } from 'react-transition-group';
import '@user-profile/css/transitions.css';

const labels = {
  title: { address: 'Meus endereços:', card: 'Meus cartões:' },
  emptyListTitle: { address: 'Nenhum endereço salvo', card: 'Nenhum cartão salvo' },
  emptyListButton: { address: 'Novo endereço', card: 'Novo cartão' },
}

function DynamicData({ dataset }) {
  const DATA_URL = `/data/${dataset}`;
  const fields = getFieldset(dataset);

  const emptyFields = {};
  fields.map(field => emptyFields[field.id] = '');

  const formTransitionRef = useRef(null);
  const emptyListTransitionRef = useRef(null);

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

  return (
      <>
      <CSSTransition
        in={dataList.length > 0 || isAddingData}
        timeout={300}
        classNames="fade"
        nodeRef={formTransitionRef}
        unmountOnExit
      >
        {() => (
          <div ref={formTransitionRef}>
            <h1 className="page-title">{labels.title[dataset]}</h1>

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
                  labelGroup={dataset}
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
          </div>
        )}
      </CSSTransition>

      <CSSTransition
        in={dataList.length === 0 && !isAddingData && !isLoading}
        timeout={300}
        classNames="fade"
        nodeRef={emptyListTransitionRef}
        unmountOnExit
      >
        {() => (
          <div ref={emptyListTransitionRef} className="h-100 w-100">
            <EmptyList title={labels.emptyListTitle[dataset]}>
              <Button
                main
                onClick={() => setIsAddingData(true)}
                icon={<Add />}
              >
                {labels.emptyListButton[dataset]}
              </Button>
            </EmptyList>
          </div>
        )}
      </CSSTransition>
      </>
  );
}

export default DynamicData;