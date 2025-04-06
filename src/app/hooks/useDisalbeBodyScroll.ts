import { useEffect } from "react"



const useDisableBodyScroll = () => {


  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  useEffect(() => {
    const handleScroll = (e: any) => {
      e.preventDefault();
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchmove', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [])
}
export const useDisableBodyScrollJS = () => {


  useEffect(() => {
    const handleScroll = (e: any) => {
      e.preventDefault();
    };


    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchmove', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [])

}


export default useDisableBodyScroll