import formatPriceToBRL from '@utils/formatPriceToBRL';
import { css } from '@emotion/react';

const totalSectionStyles = css`
  padding: var(--ws-600);
  border-radius: var(--border-radius);
  font-size: var(--fs-400);
  text-align: center;

  & span:last-child {
    font-weight: 600;
    font-size: var(--fs-800);
  }
`;

const sectionTitleStyles = css`
  padding: var(--ws-200) var(--ws-300);
  font-size: var(--fs-500);
  text-align: center;
`;

const itemStyles = css`
  display: grid;
  grid-template-columns: minmax(14ch, 1fr) 3fr;
  justify-content: start;
  align-items: center;
  gap: var(--ws-200);
`;

const keyStyles = css`
  padding: var(--ws-200) var(--ws-300);
  border-radius: var(--border-radius);
  text-align: end;
  overflow: auto;
`;

const valueStyles = css`
  padding: var(--ws-200) var(--ws-300);
  border-radius: var(--border-radius);
  text-transform: uppercase;
  overflow: auto;
`;

const emptyStyles = css`
  color: var(--white-3);
`;

const personalMapping = {
  firstName: 'Prenome',
  lastName: 'Sobrenome',
  email: 'E-mail',
  tel1: 'Telefone 1',
  tel2: 'Telefone 2',
}

const addressMapping = {
  street: 'Logradouro',
  neighborhood: 'Bairro',
  complement: 'Complemento',
  reference: 'Referência',
  city: 'Cidade',
  state: 'Estado',
  zipCode: 'CEP',
}

const cardMapping = {
  cardNumber: 'Número',
  cardName: 'Nome',
  expDate: 'Validade',
  cvv: 'CVV',
}

function ListItem({ mappedKey, value }) {
  if (!mappedKey && !value) return;
  return (
    <li css={itemStyles}>
      <p className="elv" css={keyStyles}>{mappedKey || 'Informação adicional'}:</p>
      <p className="elv-2" css={[valueStyles, !value && emptyStyles]}>
        {value ? value : 'não informado'}
      </p>
    </li>
  );
}

function InfoSection({ title, entries, map }) {
  return (
    <section className="flex-column gap-200">
      <h2 css={sectionTitleStyles}>{title}</h2>
      <ul className="flex-column gap-200">
        {entries.map(([key, value]) => (
          <ListItem key={key} mappedKey={map[key]} value={value} />
        ))}
      </ul>
    </section>
  );
}

function OrderSumamry({
  paymentMethod,
  deliveryMethod,
  personalEntries,
  addressEntries,
  cardEntries,
  status,
  total
}) {
  return (
    <div className="flex-column gap-600">
      <section aria-labelledby="section1" className="flex-column gap-600">
        <h2 id="section1" className="offscreen">Informações básicas</h2>
        <div className="flex-column gap-200 elv" css={totalSectionStyles}>
          <p className="flex-column">
            <span>{status === 'pago' ? 'Total pago:' : 'Total a pagar:'}</span>
            <span>{formatPriceToBRL(total)}</span>
          </p>
        </div>

        <div className="flex-column gap-200">
          <div css={itemStyles}>
            <p className="elv" css={keyStyles}>Pagamento:</p>
            <p className="elv-2" css={valueStyles}>
              {paymentMethod === 'card' ? 'Cartão de crédito' : paymentMethod}
            </p>
          </div>
          <div css={itemStyles}>
            <p className="elv" css={keyStyles}>Entrega:</p>
            <p className="elv-2" css={valueStyles}>
              {deliveryMethod === 'pick-up' ? 'Retirada na loja' : 'Entrega em domicílio'}
            </p>
          </div>
        </div>
      </section>

      <InfoSection
        title="Informações de contato"
        entries={personalEntries}
        map={personalMapping}
      />

      {deliveryMethod !== 'pick-up' &&
        <InfoSection
          title="Informações de entrega"
          entries={addressEntries}
          map={addressMapping}
        />
      }

      {cardEntries.length > 0 &&
        <InfoSection
          title="Informações do cartão"
          entries={cardEntries}
          map={cardMapping}
        />
      }
    </div>
  );
}

export default OrderSumamry;