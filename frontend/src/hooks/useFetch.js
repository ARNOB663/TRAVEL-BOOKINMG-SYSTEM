import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);  // Start loading
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error('Failed to fetch');  // Throw error if response is not ok
                }
                const result = await res.json();
                setData(result.data);  // Set the data if fetch is successful
            } catch (err) {
                setError(err.message);  // Set the error message if fetch fails
            } finally {   
                setLoading(false);  // Stop loading in both cases (success or failure)
            }
        };

        fetchData();
    }, [url]);

    return {
        data,
        error,
        loading
    };
};

export default useFetch;
