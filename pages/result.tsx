import React, { useState } from 'react'
import { useRouter } from "next/router"
import useSWR from 'swr';

import { Container } from '@mui/material';
import axios from 'axios';
function CheckoutForm() {
    const router = useRouter();
    /* const { session_id } = router.query  */
    const [type, setType] = useState({});

    const postData=async (url:any)=>{
    const result= await axios.get(url)
   
 const PurchaseDone = {
    id_purchase_session:result.data.session.id,
    address:result.data.session.metadata,
    items:result.data.session.line_items,
    amount_total:result.data.session.amount_total,
    customer_details:result.data.session.customer_details
 }
setType(PurchaseDone)

    console.log(result.data.session)
  console.log(PurchaseDone)
 
    }

    const {data,error} = useSWR( router.query.session_id ? `/api/checkout/${router.query.session_id}`: null,
        (url) =>    postData(url)  /*  fetch(url).then(res=> res.json()    ) */ )
        if (error) return 'An error has occurred.' + error;
       
  /*       const [type, setType] = useState(null);

        const { data } = useSWR(type ? "/api/post/vote" : null, (link) =>
          postData(link, type)
        );
     */
    return (
    
        <div>
            <Container>
        <h1>Payment Result</h1>
        <pre>{data ? JSON.stringify(data, null , 2): 'Loadding...'}</pre>
        <h1>Payment Result mejorado</h1>
        <pre>{type ? JSON.stringify(type, null , 2): 'Loadding...'}</pre>
        </Container>
        </div>
    )
}

export default CheckoutForm
