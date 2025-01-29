import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const abortCont = new AbortController();

        fetch('https://api.jsonbin.io/v3/b/66e170bfe41b4d34e42d7dc3/${id}',  {
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': '$2a$10$QIgl5qZFHtaLMiJePCogu./Hau8C3Y6M5vh5MDX5pW5yCqATcMv7m'
          },
          signal: abortCont.signal
        })
        .then(res => {
         if(!res.ok)
          {
            throw Error ('Could not fetch the data for that resource');
          }
          return res.json();
        })
        .then(data => {
          setIsPending(false);
          setData(data.blogs || []);
          setError(null);
        })
        .catch(err => {
          if (err.name === 'AbortError') {
            console.log('fetch aborted');
          } else {
            setIsPending(false);
            setError(err.message);
          }
        });

        return () => abortCont.abort();
      }, [url]);
      return { data, isPending, error };
};

export default useFetch;