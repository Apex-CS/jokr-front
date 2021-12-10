import axios from 'axios';
import Head from 'next/head';
import { useContext, useState } from 'react';
import useSWR from 'swr';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ItemProduct from '@/components/ItemProduct';
import { NineK } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { TodosContext } from '@/components/contexts/GlobalProvider';
import { Paper } from '@mui/material';
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

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
  photo_file_name: string;
  subcategory: string;
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
  /* Test COntex */
  const { cartItems, addCart } = useContext(TodosContext);
  /* Prueba context */
  //return <Head>A</Head>;
  const [cartItemss, setCartItems] = useState([] as CartItemType[]);

  console.log('With  context', cartItems);
  console.log('no  context', cartItemss);

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

  /*   setCartItems((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    }); */
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  const { data, error } = useSWR('/api/v1/products', fetcher);
  if (error) return 'An error has occurred.' + error;
  if (!data) return 'Loading...';
  return (
    
    <>
    <Container>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container /* spacing={1} */spacing={{ xs: 2, md: 3 }}   columns={{ xs: 4, sm: 8, md: 12 }} >
        
          {
        
        data?.map((item: CartItemType)=> {
          

          
           return (
             
         
           
          <>
          <Grid item  xs={3} sm={4} md={4}>
          <Item>
         <ItemProduct key={item.id} product={item} handleAddToCart={handleAddToCart}  />
         </Item>
         </Grid>
       </>
         
           )}
       )
     }
       
      </Grid>
    </Box>
    
    
    </Container>
    </>
  );
}

export default Home;
