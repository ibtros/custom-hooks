import { useEffect, useRef, useState } from 'react';

export const useFetch = ( url ) => {
  const isMounted = useRef(true);
  const initialState = {data: null, loading: true, error: null};
  const [state, setState] = useState(initialState);

  // Se ejecutará la primera vez que cargue el componente debido a la dependencia []
  useEffect(() => {
    // Se ejecutará al desmontar el componente
    return () => {
      isMounted.current = false;
    }

  }, [])

  useEffect(() => {
    setState({data: null, loading: true, error: null});
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Para que pase el test:
        // setTimeout(() => {
          if (isMounted.current) {
            setState({
              loading: false,
              error: null,
              data
            });
          } else {
            console.log('setState no se llamo');
          }
        // }, 1)  
      })
      .catch(() => {
        setState({data: null, loading: false, error: 'No se pudo cargar la info.'});
      });  
  }, [url]);

  return state;  
}
