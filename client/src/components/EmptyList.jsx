import { css } from '@emotion/react';
import { useEffect, useRef } from 'react';

function EmptyList({ title, children }) {
  const titleRef = useRef();

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <div
      className="flex-column ai-center jc-center gap-600"
      css={css`padding-block: var(--ws-800); height: 100%;`}
    >
      <h1 tabIndex={-1} ref={titleRef} className="text-center">{title}</h1>
      {children}
    </div>
  );
}

export default EmptyList;