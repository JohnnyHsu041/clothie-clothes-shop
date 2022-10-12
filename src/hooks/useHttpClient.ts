import { useCallback, useEffect, useRef } from "react";

type sendReqFunc = (
    url: string,
    method?: string,
    body?: BodyInit | null,
    headers?: { [props: string]: string } | {}
) => any;

const useHttpClient = () => {
    const activeHttpReqs = useRef<AbortController[]>([]);

    const sendRequest: sendReqFunc = useCallback(
        async (url, method = "GET", body = null, headers = {}) => {
            const httpAbortCtrl = new AbortController();
            activeHttpReqs.current.push(httpAbortCtrl);

            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortCtrl.signal,
                });
                const responseData = await response.json();

                activeHttpReqs.current = activeHttpReqs.current.filter(
                    (reqCtrl) => reqCtrl !== httpAbortCtrl
                );

                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                return responseData;
            } catch (err: any) {
                console.log(err.message);
            }
        },
        []
    );

    useEffect(() => {
        return () => {
            activeHttpReqs.current.forEach((abortCtrl) => abortCtrl.abort());
        };
    }, []);

    return [sendRequest];
};

export default useHttpClient;
