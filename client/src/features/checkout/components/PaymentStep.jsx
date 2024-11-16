// Hooks
import { useContext, useState } from 'react';
import useFetchData from '@hooks/useFetchData';
import useForm from '@hooks/useForm';
import useInitializeData from '@hooks/useInitializeData';
import useHandleGenericInputChange from '@hooks/useHandleGenericInputChange';

// Contexts
import CheckoutContext from '@checkout/contexts/CheckoutContext';
import AuthContext from '@authentication/contexts/AuthContext';

// Components
import Form from '@forms/Form';
import FormHeader from '@forms/FormHeader';
import FormBody from '@forms/FormBody';
import FormFooter from '@forms/FormFooter';
import Button from '@buttons/Button';
import BackButton from '@checkout/components/BackButton';
import PaymentOptions from '@checkout/components/PaymentOptions'
import PromoCodeForm from '@checkout/components/PromoCodeForm';

// API
import axios from '@services/axios';

// Utilities
import getFieldset from '@utils/getFieldset';
import preventInvalidSubmission from '@utils/preventInvalidSubmission';

const DATA_URL = '/card-data';
const fields = getFieldset('card', 'essentialsOnly');

const emptyFields = {};
fields.map(field => emptyFields[field.id] = '');

function PaymentStep() {
  const { auth } = useContext(AuthContext);
  const { next, getOrderInfo, setOrderInfo, removeOrderInfo } = useContext(CheckoutContext);
  const paymentMethod = getOrderInfo('paymentMethod');
  
  const { dataList: cardDataList, isLoading } = useFetchData(`${DATA_URL}?userId=${auth.id}`);

  const {
    errRef,
    formValues,
    setFormValues,
    errMsg,
    setErrMsg,
    validations,
    isFormValid
  } = useForm(fields);

  const [ selectedCardId, setSelectedCardId ] = useState('');
  const isNewData = cardDataList.length < 3 && selectedCardId === 'custom';

  const { handleGenericInputChange } = useHandleGenericInputChange();

  useInitializeData(isLoading, cardDataList, setFormValues, setSelectedCardId);

  function handleInputChange(e, autoFormat) {
    handleGenericInputChange(e, autoFormat, setFormValues, setErrMsg);
    setSelectedCardId('custom');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (paymentMethod === 'card' && preventInvalidSubmission(isFormValid, setErrMsg, errRef)) return;

    if (paymentMethod === 'card') {
      setOrderInfo('cardData', formValues);
    } else {
      removeOrderInfo('cardData');
    }

    if (isNewData) {
      const placeholderNickname = `Meu cartão ${cardDataList.length + 1}`;

      try {
        await axios.post(
          DATA_URL,
          { ...formValues, nickname: placeholderNickname, userId: auth.id }
        );
      } catch (error) {
        console.error(error);
      }
    }

    next();
  }

  return(
    <>
    <h1 className="page-title">Forma de pagamento</h1>
    
    <div className="flex-column gap-700">
      <section>
        <PromoCodeForm />
      </section>

      <section>
        <PaymentOptions />
      </section>

      <section>
        {paymentMethod === 'card' ? (
          <div className="flex-column gap-400">
            <FormHeader
              dataList={cardDataList}
              selectedDataId={selectedCardId}
              setSelectedDataId={setSelectedCardId}
              setFormValues={setFormValues}
              labelGroup="card"
              readOnly
              withCustom
            />

            <Form
              onSubmit={handleSubmit}
              errRef={errRef}
              isLoading={isLoading}
              isFormValid={isFormValid}
              errMsg={errMsg}
              noFooter
              autoFocus={false}
            >
              <FormBody
                fields={fields}
                formValues={formValues}
                validations={validations}
                handleInputChange={handleInputChange}
              />
              <FormFooter>
                <BackButton />
                <Button disabled={!isFormValid}>
                  Avançar para revisão da compra
                </Button>
              </FormFooter>
            </Form>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormFooter>
              <BackButton />
              <Button main disabled={!paymentMethod}>
                Avançar para revisão da compra
              </Button>
            </FormFooter>
          </form>
        )
        }
      </section>
    </div>
    </>
  );
}

export default PaymentStep;