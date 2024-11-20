// Components
import Radio from '@inputs/Radio';
import ZipCodeForm from '@components/forms/ZipCodeForm';

// Styles
import { css } from '@emotion/react';

function DeliveryOptions({ deliveryMethod, setDeliveryMethod, shippingInfo }) {
  return (
    <section className="flex-column gap-600" aria-labelledby="deliveryTitle">
      <h2 id="deliveryTitle" className="offscreen">Opções de entrega</h2>
      <div className="flex jc-center gap-400">
        <Radio
          label="Retirada na loja"
          name="delivery"
          value="pick-up"
          setValue={setDeliveryMethod}
          checked={deliveryMethod === 'pick-up'}
        />
        <Radio
          label="Entrega em mãos"
          name="delivery"
          value="standard-delivery"
          setValue={setDeliveryMethod}
          checked={deliveryMethod === 'standard-delivery'}
          ariaControls="zipCodeArea"
        />
      </div>
      <div
        id="zipCodeArea"
        className={deliveryMethod === 'standard-delivery' ? 'grid jc-center gap-050' : 'offscreen'}
        aria-hidden={deliveryMethod !== 'standard-delivery'}
      >
        <ZipCodeForm label="Insira o CEP do endereço de entrega:" />
        <p
          id="zipCodeLocation"
          className="text-clr-3"
          css={css`font-size: var(--fs-300);`}
          aria-hidden="true"
        >
          {shippingInfo.location ?? ''}
        </p>
        <p
          className="offscreen"
          role="status"
        >
          {shippingInfo.location ? `${shippingInfo.location}: ${shippingInfo.price} reais` : ''}
        </p>
      </div>
    </section>
  );
}

export default DeliveryOptions;