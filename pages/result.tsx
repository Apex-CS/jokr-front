import React from 'react'
import { useRouter } from "next/router"
import useSWR from 'swr';

function CheckoutForm() {
    const router = useRouter();
    /* const { session_id } = router.query  */
    const {data,error} = useSWR(
        router.query.session_id ? `/api/checkout/${router.query.session_id}`: null,
        (url) => fetch(url).then(res=> res.json()) )
        if (error) return 'An error has occurred.' + error;
        
    return (
        <div>
        <h1>Payment Result</h1>
        <pre>{data ? JSON.stringify(data, null , 2): 'Loadding...'}</pre>
        </div>
    )
}

export default CheckoutForm
