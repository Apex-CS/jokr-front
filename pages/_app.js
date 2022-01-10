import '../styles/globals.css';
import '../styles/Home.module.css';
import GlobalProvider from '@/components/contexts/GlobalProvider';

import { useRouter } from 'next/router';
import Header from '@/components/default/Header';
import { styled } from '@mui/material/styles';
import { TodosContext } from '@/components/contexts/GlobalProvider';
import { Fragment, useContext, useEffect, useState } from 'react';
import Loader from '@/components/Loader/loader';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const ItemStyle = {
  flexGrow: 1,
  p: 12,
  marginTop: -20,
  backgroundColor: '#f4f6f9',
};

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { Login, IsLogged } = useContext(TodosContext);

  const [ Token, setToken ] = useState('');
  console.log('valor del token', Token);

  useEffect(() => {
    const getToken = async () => {
      const token = localStorage.getItem('token').toString();
      if (token) setToken(token);
    };

    getToken();
  }, []);

  if (pageProps.protected && !Token) {
    return <Loader/>;
  }

 /*  if (
    pageProps.protected &&
    User &&
    pageProps.userTypes &&
  pageProps.userTypes.indexOf(User.role) === -1 
    !User.role 
  ) {
    return <Layout>Sorry, you dont have access</Layout>;
  } */

  const showBarLogin = router.pathname === '/login' ? true : false;

  return (
    <>
      <GlobalProvider>
        {!showBarLogin && (
          <Fragment>
            <Header />
          </Fragment>
        )}

        <div className={!showBarLogin ? 'content-warp' : ''}>
          <DrawerHeader />
          <Component {...pageProps} />
        </div>
      </GlobalProvider>
    </>
  );
}
