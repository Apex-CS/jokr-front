import axios from 'axios';
import Head from 'next/head';
import { useContext} from 'react';
import useSWR from 'swr';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import ItemProduct from '@/components/Product/ItemProduct';
import Container from '@mui/material/Container';
import { TodosContext } from '@/components/contexts/GlobalProvider';
import { Paper } from '@mui/material';
import React from 'react';

export type CartItemType = {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  is_active: number;
  created_at: string;
  updated_at: string;
  stock: number;
  subcategory: string;
  photo_file_name: string;
  amount: number;
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
function Home() {
  const { addCart } = useContext(TodosContext);
  //return <Head>A</Head>;
  const handleAddToCart = (clickedItem: CartItemType) => {
    addCart(
      clickedItem.id,
      clickedItem.sku,
      clickedItem.name,
      clickedItem.description,
      clickedItem.price,
      clickedItem.is_active,
      clickedItem.created_at,
      clickedItem.updated_at,
      clickedItem.stock,
      clickedItem.subcategory,
      clickedItem.photo_file_name,
      0
    );
  };

  const { data, error } = useSWR('/api/v1/products', fetcher);
  if (error) return 'An error has occurred.' + error;
  if (!data) return 'Loading...';

  return (
    <>
      <Container>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 8, md: 12 }}>
          {data?.map((item: CartItemType, index: number) => {
            return (
              <div key={index}>
                <br />
                <Grid item xs={3} sm={4} md={10}>
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
      </Container>
    </>
  );
}

export default Home;
