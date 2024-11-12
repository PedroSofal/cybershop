import { useEffect, useState } from "react";

function useHideOnScroll() {
  const [ prevScrollpos, setPrevScrollpos ] = useState(window.scrollY);
  const [ isHidden, setIsHidden ] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (prevScrollpos > currentScrollPos) {
        setIsHidden(false);
      } else {
        setIsHidden(true);
      }
      setPrevScrollpos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollpos]);

  return isHidden;
}

export default useHideOnScroll;