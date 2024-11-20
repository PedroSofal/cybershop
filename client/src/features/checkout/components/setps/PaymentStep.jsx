// Hooks
import { useContext, useState } from 'react';
import useFetchData from '@hooks/useFetchData';
import useForm from '@hooks/useForm';
import useInitializeData from '@hooks/useInitializeData';
import useHandleGenericInputChange from '@hooks/useHandleGenericInputChange';

// Contexts
import CheckoutContext from '@checkout/contexts/CheckoutContext';

// Components
import Form from '@components/ui/form/Form';
import FormHeader from '@components/ui/form/FormHeader';
import FormBody from '@components/ui/form/FormBody';
import FormFooter from '@components/ui/form/FormFooter';
import Button from '@buttons/Button';
import BackButton from '@checkout/components/BackButton';
import PaymentOptions from '@checkout/components/PaymentOptions'
import PromoCodeForm from '@checkout/components/PromoCodeForm';

// API
import { dbAPI } from '@services/axios';

// Utilities
import getFieldset from '@utils/getFieldset';
import preventInvalidSubmission from '@utils/preventInvalidSubmission';

const DATA_URL = '/data/card';
const fields = getFieldset('card', 'essentialsOnly');

const emptyFields = {};
fields.map(field => emptyFields[field.id] = '');

function PaymentStep() {
  const { next, getOrderInfo, setOrderInfo, removeOrderInfo } = useContext(CheckoutContext);
  const paymentMethod = getOrderInfo('paymentMethod');
  
  const { dataList: cardDataList, isLoading } = useFetchData(DATA_URL);

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
        await dbAPI.post(
          DATA_URL,
          { ...formValues, nickname: placeholderNickname }
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
                <Button main disabled={!isFormValid}>
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