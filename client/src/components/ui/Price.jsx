import formatPriceToBRL from '@utils/formatPriceToBRL';
import { css } from '@emotion/react';
import mq from '@utils/getMediaQueries';

const symbolStyles = css`
  font-size: var(--fs-500);
  font-weight: 400;

  ${mq('tablet')} {
    font-size: var(--fs-300);
  }
`;

const priceStyles = (small) => css`
  font-size: ${small ? 'var(--fs-500)' : 'var(--fs-600)'};
  font-weight: 600;

  ${mq('tablet')} {
    font-size: var(--fs-300);
  }
`;

function Price({ priceNumber, small }) {
  return (
    <p aria-label={`Preço de ${formatPriceToBRL(priceNumber, true)}`}>
      <span css={symbolStyles}>R$ </span>
      <span css={() => priceStyles(small)}>
        {formatPriceToBRL(priceNumber, true).slice(3)}
      </span>
    </p>
  );
}

export default Price;