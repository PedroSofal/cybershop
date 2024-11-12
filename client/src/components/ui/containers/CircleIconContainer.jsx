import { css } from '@emotion/react';

const circleStyles = css`
  display: grid;
  place-content: center;
  width: 2.05em;
  height: 2.05em;
  border-radius: 50%;
`;

function CircleIconContainer({ styles, notification, ariaLabel, children }) {
  return (
    <div css={[circleStyles, styles].filter(Boolean)} className="circle-icon-container">
      {children}
      <span role={notification ? 'status' : ''} className="offscreen">{ariaLabel}</span>
    </div>
  );
}

export default CircleIconContainer;