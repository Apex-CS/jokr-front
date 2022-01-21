import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Button,
} from '@mui/material';
import axios from 'axios';
import Link from 'next/link';



function CheckoutForm() {
  const router = useRouter();
  const [type, setType] = useState({});
  const [dataFront, setData] = useState<any>({});

  const postData = async (url: any) => {
    const result = await axios.get(url);

    const PurchaseDone = {
      id_purchase_session: result.data.session.id,
      address: result.data.session.metadata,
      items: result.data.session.line_items,
      amount_total: result.data.session.amount_total,
      customer_details: result.data.session.customer_details,
    };
    setType(PurchaseDone);
    setData(PurchaseDone)
    /* await axios.post('/api/v1/orders',{...PurchaseDone},{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}) */ 

  };

  const { data, error } = useSWR(
    router.query.session_id ? `/api/checkout/${router.query.session_id}` : null,
    (url) => postData(url) /*  fetch(url).then(res=> res.json()    ) */
  );
  if (error) return 'An error has occurred.' + error;
  //http://localhost:3000/result?session_id=cs_test_b1rPcDe5PXYpJ8cHQvJQ6w92VUXwbGeEUvwTtTuEM8XaiYZlziKDwoj8ZS
     //   http://localhost:3000/result?session_id=cs_test_b1tdmj3nG3r9F6OhRdaimj2brT1dcoQ8ABMaMvIghplLwEkVrQVik40yhW
  return (
    <div>
      <Container sx={{ alignContent: 'center', alignItems: 'center' }}>
      <pre>{type ? JSON.stringify(type, null, 2) : 'Loadding...'}</pre> 

        <Card sx={{ maxWidth: 1000, marginLeft: '5rem' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <h1>!! Perfect</h1>
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Thanks for your purchase
            </Typography>
          </CardContent>
          <CardActions>
            <Link href="/history">
              <Button>OK</Button>
            </Link>
          </CardActions>
        </Card>
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default CheckoutForm;
