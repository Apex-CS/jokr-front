import axios from 'axios';
import Head from 'next/head';
import { useState } from 'react';
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
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ItemProduct from '@/components/ItemProduct';
import { NineK } from '@mui/icons-material';
import { Paper } from '@material-ui/core';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


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

  /* Prueba context */
  //return <Head>A</Head>;
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const getTotalItems = (items: CartItemType[]) =>
  items.reduce((ack: number, item) => ack + item.amount, 0);

  console.log("index",cartItems)
  const handleAddToCart = (clickedItem: CartItemType) => {
  setCartItems(prev => {
    // 1. Is the item already added in the cart?
    const isItemInCart = prev.find(item => item.id === clickedItem.id);
    if (isItemInCart) {
      return prev.map(item =>
        item.id === clickedItem.id
          ? { ...item, amount: item.amount + 1 }
          : item
      );
    }
    // First time the item is added
    return [...prev, { ...clickedItem, amount: 1 }];
  });
};

const handleRemoveFromCart = (id: number) => {
  setCartItems(prev =>
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

  const { data, error } = useSWR('/api/showProducts', fetcher);
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
    )
}



export default Home;
