import { useEffect, useRef, useState } from 'react';
import SuspendedContent from '@suspended/SuspendedContent';
import SuspendedButton from '@suspended/SuspendedButton';

function SuspendedOnClick({ button, content, contentStyles, contentLabel, contentRole }) {
  const menuRef = useRef();
  const buttonRef = useRef();

  const [ isContentVisibile, setIsContentVisible ] = useState(false);
  
  useEffect(() => {
    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);
  }, []);

  useEffect(() => {
    if (isContentVisibile) {
      menuRef.current.style.display = 'block';
    } else {
      menuRef.current.style.display = 'none';
    }
  }, [isContentVisibile]);

  function handleWindowClick(e) {
    if (e.target.closest('button') !== buttonRef.current) {
      setIsContentVisible(false);
    }
  }

  function handleButtonClick() {
    setIsContentVisible(!isContentVisibile);
  }

  return (
    <div className="pos-relative">
      <SuspendedButton
        htmlRef={buttonRef}
        onClick={handleButtonClick}
        ariaLabel={contentLabel}
        ariaExpanded={isContentVisibile}
        ariaHasPopup={contentRole}
      >
        {button}
      </SuspendedButton>

      <SuspendedContent
        styles={contentStyles}
        htmlRef={menuRef}
        ariaRole={contentRole}
      >
        {content}
      </SuspendedContent>
    </div>
  );
}

export default SuspendedOnClick;