import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from 'lenis/react';

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      
      const scrollToElement = () => {
        const element = document.getElementById(id);
        if (element) {
          if (lenis) {
            lenis.scrollTo(element, { offset: 0, duration: 1.2 });
          } else {
            element.scrollIntoView({ behavior: "smooth" });
          }
          return true;
        }
        return false;
      };

      // Try immediately
      if (!scrollToElement()) {
        // If not found (e.g. lazy loaded), try multiple times
        let retries = 0;
        const interval = setInterval(() => {
          if (scrollToElement() || retries > 50) { // 10 seconds max wait
            clearInterval(interval);
          }
          retries++;
        }, 200); 
        
        return () => clearInterval(interval);
      }
    } else {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, hash, lenis]);

  return null;
};

export default ScrollToHash;
