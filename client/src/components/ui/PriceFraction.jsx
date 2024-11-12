import { css } from '@emotion/react';

const priceStyles = (bold) => css`
  font-weight: ${bold ? 600 : 400};
  border-radius: var(--border-radius);
  padding: var(--ws-200) var(--ws-400);
`;

function PriceFraction({ label, fractionValue, bold }) {
  return (
    <p className="flex ai-center gap-400">
      <span className="text-clr-2"
      >{label}</span>
      
      <span className="elv" css={() => priceStyles(bold)}
      >{fractionValue}</span>
    </p>
  );
}

export default PriceFraction;