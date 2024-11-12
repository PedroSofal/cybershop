import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import SuspendedContent from '@suspended/SuspendedContent';
import SuspendedButton from '@suspended/SuspendedButton';

function SuspendedOnHover({ button, content, contentStyles, contentRole, linkTo }) {
  const navigate = useNavigate();

  const buttonRef = useRef();
  const contentRef = useRef();
  const timeoutRef = useRef(null);

  const [ isContentOpen, setIsContentOpen ] = useState(false);
  const [ isTouchDevice, setIsTouchDevice ] = useState(false);

  useEffect(() => {
    const checkTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(checkTouchDevice);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (contentRef.current.contains(e.target)) {
        setTimeout(() => {
          setIsContentOpen(false);
        }, 200);
      } else if (!buttonRef.current.contains(e.target)) {
        setIsContentOpen(false);
      }
    }

    window.addEventListener('touchstart', handleClickOutside);

    return () => {
      window.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isContentOpen) {
      contentRef.current.style.display = 'unset';
      buttonRef.current.setAttribute('aria-expanded', true);
    } else {
      contentRef.current.style.display = 'none';
      buttonRef.current.setAttribute('aria-expanded', false);
    }
  }, [isContentOpen]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  function handleClick() {
    if (isTouchDevice) {
      setIsContentOpen(prev => !prev);
    } else if (linkTo) {
      navigate(linkTo);
    }
  }

  function handleMouseLeave() {
    if (!isTouchDevice) {
      timeoutRef.current = setTimeout(() => {
        setIsContentOpen(false);
      }, 100);
    }
  }

  function handleMouseEnter() {
    if (!isTouchDevice) {
      clearTimeout(timeoutRef.current);
      setIsContentOpen(true);
    }
  }

  function handleKeyUp(e) {
    if (e.key === 'Escape') {
      setIsContentOpen(false);
    }
  }
  
  return (
    <div
      className="pos-relative"
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onBlur={handleMouseLeave}
      onFocus={handleMouseEnter}
      onKeyUp={handleKeyUp}
    >
      <SuspendedButton
        htmlRef={buttonRef}
        onClick={handleClick}
        ariaHasPopup={contentRole}
      >
        {button}
      </SuspendedButton>

      <SuspendedContent
        styles={contentStyles}
        htmlRef={contentRef}
      >
        {content}
      </SuspendedContent>
    </div>
  );
}

export default SuspendedOnHover;