import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import ItemProduct from '@/components/Product/ItemProduct';
import toast, { Toaster } from 'react-hot-toast';
import { TodosContext } from '@/components/contexts/GlobalProvider';
import { CardContent, Paper, Typography, Box, Card, CardMedia, Button } from '@mui/material';
import React from 'react';
import Router from 'next/router';
import Loader from '@/components/Loader/LoaderCommon';

export type CartItemType = {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  subcategory: string;
  photoUrl: string;
  amount: number;
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Home() {
  const { addCart } = useContext(TodosContext);

  const { AllProducts } = useContext(TodosContext);
  /* const fetcher = (url: string) =>  axios.get(url,{  headers: {'Authorization': 'Bearer '+localStorage.getItem('token')}}).then((res) => res.data); */

  const handleAddToCart = (clickedItem: CartItemType) => {
    addCart(
      clickedItem.id,
      clickedItem.sku,
      clickedItem.name,
      clickedItem.description,
      clickedItem.price,
      clickedItem.stock,
      clickedItem.subcategory,
      clickedItem.photoUrl,
      0
    );

    toast.custom((t) => (
      <>
        <Card
          sx={{
            display: 'flex',
            height: '5rem',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
            background: '#FFFBE1',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div">New product added to cart</Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {clickedItem.name}
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 150 }}
            image={clickedItem.photoUrl}
            alt="Live from space album cover"
          />
        </Card>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </Button>
      </>
    ));
  };

  return (
    <>
      <Grid
        container
        spacing={{ xs: 3, md: 1 }}
        columns={{ xs: 2, sm: 8, md: 11.5 }}
        sx={{ paddingTop: -20, paddingLeft: 15 }}
      >
        {AllProducts?.map((item: CartItemType, index: number) => {
          return (
            <div key={index}>
              <br />
              <Grid item xs={2} sm={4} md={10}>
                <Item>
                  <ItemProduct
                    product={item}
                    handleAddToCart={handleAddToCart}
                    id={item.id}
                    key={index}
                  />
                </Item>
              </Grid>
            </div>
          );
        })}
      </Grid>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default Home;
