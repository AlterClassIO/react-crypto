import { useEffect } from 'react';
// TODO: Import the react-router-dom dependencies here

const useScrollToTop = () => {
  // 1. TODO: Retrieve the location object and the current pathname from that object
  const location = null;

  // 2. TODO: Scroll the window up every time the pathname (from the location object) changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

export default useScrollToTop;
