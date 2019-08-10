import { useEffect, useState } from 'react';
import axios from 'axios';

function useReaxios(url, formatFn = null) {

    const [dataLoadingProps, setDataLoadingProps] = useState({
        response: [],
        isLoading: false,
        error: null,
    });

    const makeRequest = async url => {

        setDataLoadingProps(prevState => ({
            ...dataLoadingProps,
            isLoading: true
        }));

        try {
            const res = await axios.get(url);
            setDataLoadingProps(prevState => ({
                ...dataLoadingProps,
                isLoading: false,
                response: formatFn ? (
                    res && formatFn.fn(res.data, ...formatFn.args) 
                ) : res.data,
            }));
        } catch(error) {
            setDataLoadingProps(prevState => ({
                ...dataLoadingProps,
                error,
                isLoading: false,
            }));
        }
    }

    useEffect(() => {
        makeRequest(url)
    }, [])

    return dataLoadingProps;
}

export default useReaxios;
