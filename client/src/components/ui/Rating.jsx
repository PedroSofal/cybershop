import StarOutlined from '@assets/star-outlined.svg';
import Star from '@assets/star.svg';
import { css } from '@emotion/react';

const starsStyles = (ratingWidth) => css`
  position: relative;
  width: 120px;
  height: 24px;
  background: url(${StarOutlined});
  filter: var(--rating-filter);

  &::after {
    content: '';
    position: absolute;
    width: ${ratingWidth};
    height: 100%;
    background: url(${Star});
  }
`;

function Rating({ refProduct }) {
  const rate = refProduct?.rating.rate;
  const count = refProduct?.rating.count;

  const ratingWidth = rate / 5 * 100 + '%' || '100%';

  return(
    <div
      className="flex ai-center gap-200"
      aria-label={`avaliação de ${rate} estrelas em 5, por ${count} pessoas`}
    >
      <div aria-hidden="true" css={() => starsStyles(ratingWidth)}></div>
      <p aria-hidden="true">({count} avaliações)</p>
    </div>
  );
}

export default Rating;