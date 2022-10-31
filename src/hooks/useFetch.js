import { useEffect, useState } from "react"


export const useFetch  = (url, _options) => {    
    const [data,setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        const fetchData = async () => {
            setIsPending(true);
            
            try {
                const response = await fetch(url, {signal : controller.signal});
                if(!response.ok)
                {
                    throw new Error(response.statusText)
                }
                const json = await response.json();

                setIsPending(false);
                setData(json);
                setError(null);

            } catch (error) {
                if(error.name === "AbortError" )
                {
                    console.log('fetch was aborted')
                } else {
                    setIsPending(false);
                    setError('Could not fetch the data');
                    console.log(error.message);
                }
            }
        }

        fetchData()
        // Clean up 
        return () => {
            controller.abort()
        }
    }, [url])

    return {data, isPending, error}
}
