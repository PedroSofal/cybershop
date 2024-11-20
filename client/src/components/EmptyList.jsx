import { useEffect, useRef } from 'react';

function EmptyList({ title, children }) {
  const titleRef = useRef();

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <div
      className="grid pi-center pc-center gap-600 h-100"
    >
      <h1 tabIndex={-1} ref={titleRef} className="text-center">{title}</h1>
      {children}
    </div>
  );
}

export default EmptyList;