import '../styles/globals.css';
import '../styles/Home.module.css';
import GlobalProvider from '@/components/contexts/GlobalProvider'; 

import Header from '@/components/default/Header';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


export default function MyApp({ Component, pageProps }) {
  return (
    <>
     <GlobalProvider> 
        <Header />
        <Box  sx={{ flexGrow: 1, p: 12, marginTop: -20, backgroundColor:'#f4f6f9' }}>
          <DrawerHeader />
          <Component {...pageProps} />
        </Box>

       </GlobalProvider> 
    </>
  );
}
