// Hooks
import { useContext, useEffect, useRef, useState } from 'react';
import useFetchData from '@hooks/useFetchData';
import useForm from '@hooks/useForm';
import useInitializeData from '@hooks/useInitializeData';
import useHandleGenericInputChange from '@hooks/useHandleGenericInputChange';
import useHandleZipCodeChange from '@hooks/useHandleZipCodeChange';

// Contexts
import CheckoutContext from '@checkout/contexts/CheckoutContext';

// Components
import Form from '@components/ui/form/Form';
import FormBody from '@components/ui/form/FormBody';
import FormFooter from '@components/ui/form/FormFooter';
import Fieldset from '@components/ui/form/Fieldset';
import Button from '@buttons/Button';
import BackButton from '@checkout/components/BackButton';
import FormHeader from '@components/ui/form/FormHeader';

// Utilities
import getFieldset from '@utils/getFieldset';
import preventInvalidSubmission from '@utils/preventInvalidSubmission';

// API
import { dbAPI } from '@services/axios';

// Styles
import { css } from '@emotion/react';

const PERSONAL_DATA_URL = '/data/personal';
const ADDRESS_DATA_URL = '/data/address';
const personalFields = getFieldset('personal', 'essentialsOnly');
const addressFields = getFieldset('address', 'essentialsOnly');

function PersonalFieldset({ setValues, setIsValid, setIsLoading, setIsNewData }) {
  const { dataList, isLoading } = useFetchData(PERSONAL_DATA_URL);
  
  const {
    formValues,
    setFormValues,
    validations,
    isFormValid,
    handleInputChange
  } = useForm(personalFields);

  useInitializeData(isLoading, dataList, setFormValues);

  useEffect(() => setValues(formValues), [formValues]);
  useEffect(() => setIsValid(isFormValid), [isFormValid]);
  useEffect(() => setIsLoading(isLoading), [isLoading]);
  useEffect(() => setIsNewData(dataList.length === 0), [dataList]);

  return (
    <Fieldset legend="1. Contato">
      <FormBody
        fields={personalFields}
        formValues={formValues}
        validations={validations}
        handleInputChange={handleInputChange}
      />
    </Fieldset>
  );
}

function AddressFieldset({ setValues, setIsValid, setIsLoading, setIsNewData }) {
  const { dataList, isLoading } = useFetchData(ADDRESS_DATA_URL);

  const {
    formValues,
    setFormValues,
    validations,
    isFormValid,
  } = useForm(addressFields);

  const [ selectedAddressId, setSelectedAddressId ] = useState('');

  const { handleGenericInputChange } = useHandleGenericInputChange();
  const { handleZipCodeChange } = useHandleZipCodeChange(addressFields, setFormValues);

  const placeholderNickname = `Meu endereço ${dataList.length + 1}`;
  useInitializeData(isLoading, dataList, setFormValues);
  
  useEffect(() => setValues({...formValues, nickname: placeholderNickname}), [formValues]);
  useEffect(() => setIsValid(isFormValid), [isFormValid]);
  useEffect(() => setIsLoading(isLoading), [isLoading]);
  useEffect(() => setIsNewData(dataList.length < 3 && selectedAddressId === 'custom'), [selectedAddressId, dataList]);

  function handleInputChange(e, autoFormat) {
    handleGenericInputChange(e, autoFormat, setFormValues);
    handleZipCodeChange(e, autoFormat, setFormValues, addressFields);
    setSelectedAddressId('custom');
  }

  return (
    <Fieldset legend="2. Endereço">
      <FormHeader
        dataList={dataList}
        selectedDataId={selectedAddressId}
        setSelectedDataId={setSelectedAddressId}
        setFormValues={setFormValues}
        labelGroup="address"
        readOnly
        withCustom
        autoFocus={false}
      />
      <FormBody
        fields={addressFields}
        formValues={formValues}
        validations={validations}
        handleInputChange={handleInputChange}
      />
    </Fieldset>
  );
}

function DeliveryStep() {
  const errRef = useRef();

  const { next, getOrderInfo, setOrderInfo, removeOrderInfo } = useContext(CheckoutContext);
  const deliveryMethod = getOrderInfo('deliveryMethod');

  const [ personalValues, setPersonalValues ] = useState(null);
  const [ addressValues, setAddressValues ] = useState(null);
  const [ isPersonalValid, setIsPersonalValid ] = useState(false);
  const [ isAddressValid, setIsAddressValid ] = useState(false);
  const [ isPersonalLoading, setIsPersonalLoading ] = useState(false);
  const [ isAddressLoading, setIsAddressLoading ] = useState(false);
  const [ isNewPersonal, setIsNewPersonal ] = useState(false);
  const [ isNewAddress, setIsNewAddress ] = useState(false);
  const [ errMsg, setErrMsg ] = useState('');
  
  const isFormValid = deliveryMethod === 'pick-up' ? isPersonalValid : isPersonalValid && isAddressValid;
  const isFormLoading = deliveryMethod === 'pick-up' ? isPersonalLoading : isPersonalLoading || isAddressLoading;

  async function handleSubmit(e) {
    e.preventDefault();
    if (preventInvalidSubmission((isFormValid), setErrMsg, errRef)) {
      return;
    }

    setOrderInfo('personalData', personalValues);
    if (deliveryMethod !== 'pick-up') {
      setOrderInfo('addressData', addressValues);
    } else {
      removeOrderInfo('addressData');
    }

    if (isNewPersonal) {
      try {
        await dbAPI.post(
          PERSONAL_DATA_URL,
          { ...personalValues }
        );
      } catch (error) {
        console.error(error);
      }
    }

    if (isNewAddress) {
      try {
        await dbAPI.post(
          ADDRESS_DATA_URL,
          { ...addressValues }
        );
      } catch (error) {
        console.error(error);
      }
    }

    next();
  }
  
  return (
    <>
    <h1 className="page-title">Informações de entrega</h1>

    <Form
      onSubmit={handleSubmit}
      errRef={errRef}
      isLoading={isFormLoading}
      isFormValid={isFormValid}
      errMsg={errMsg}
      noFooter
    >

      <PersonalFieldset
        setValues={setPersonalValues}
        setIsValid={setIsPersonalValid}
        setIsLoading={setIsPersonalLoading}
        setIsNewData={setIsNewPersonal}
      />
      {deliveryMethod !== 'pick-up' &&
        <>
        <hr className="hr-faded" css={css`margin-block: var(--ws-400);`} />
        <AddressFieldset
          setValues={setAddressValues}
          setIsValid={setIsAddressValid}
          setIsLoading={setIsAddressLoading}
          setIsNewData={setIsNewAddress}
        />
        </>
      }

      <FormFooter>
        <BackButton />
        <Button main disabled={!isFormValid}>
          Avançar para forma de pagamento
        </Button>
      </FormFooter>
    </Form>
    </>
  );
}

export default DeliveryStep;