import '../styles/globals.css';
import '../styles/Home.module.css';
import GlobalProvider from '@/components/contexts/GlobalProvider';

import { useRouter } from 'next/router';
import Header from '@/components/default/Header';
import { styled } from '@mui/material/styles';
import { TodosContext } from '@/components/contexts/GlobalProvider';
import { Fragment, useContext, useEffect, useState } from 'react';
/* import Loader from '@/components/Loader/LoaderCommon'; */

import Check from '@/components/Loader/LoaderCommon';
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

  const { Token, IsToken } = useContext(TodosContext);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const getToken = async () => {
      if (token) {
        const jwt = JSON.parse(atob(token.split('.')[1]));
        IsToken(token);

        console.log(jwt);
        if (jwt.exp * 1000 < Date.now()) {
          console.log('JWT has expired or will expire soon, te la pelashion');
        } else {
          /*  IsLogged(jwt.name)  */
          console.log('JWT is valid for less than 5 minutes', token);
        }
      }
    };

    getToken();
  }, []);

  if (pageProps.protected && !token && typeof window !== 'undefined') {
    /*   return <Check />; */
    window.location.href = '/login';
  }

  if (
    pageProps.protected &&
    /*   User && */
    token &&
    pageProps.userTypes
    /*   pageProps.userTypes.indexOf(User.role) === -1  */
    /*    !User.role  */
  ) {
    return <Layout>Sorry, you dont have access</Layout>;
  }

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
