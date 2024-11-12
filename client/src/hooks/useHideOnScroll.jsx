import { useEffect, useState } from "react";

function useHideOnScroll() {
  const [prevScrollpos, setPrevScrollpos] = useState(window.scrollY);
  const [isHidden, setIsHidden] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Detectar um movimento de "bounce" (pequena rotação que ocorre no topo ou fundo)
      if (Math.abs(prevScrollpos - currentScrollPos) < 50) {
        if (!isBouncing) {
          setIsBouncing(true);
        }
        return; // Ignora a rolagem se for um "bounce"
      } else {
        if (isBouncing) {
          setIsBouncing(false);
        }
      }

      // Mostrar ou esconder o elemento com base na rolagem
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
  }, [prevScrollpos, isBouncing]);

  return isHidden;
}

export default useHideOnScroll;
