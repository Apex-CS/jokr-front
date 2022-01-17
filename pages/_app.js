import '../styles/globals.css';
import '../styles/Home.module.css';
import GlobalProvider from '@/components/contexts/GlobalProvider';
import { Router, useRouter } from 'next/router';
import Header from '@/components/default/Header';
import { styled } from '@mui/material/styles';
import { Fragment, useContext, useEffect, useState } from 'react';
import Check from '@/components/Loader/Check';

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
  const auth = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const [UserType, setUserType] = useState('');

  useEffect(() => {
    const getToken = async () => {
      if (auth) {
        const jwt = JSON.parse(atob(auth.split('.')[1]));
        setUserType(jwt.authorities.toString());
      }
    };
    getToken();
  }, []);

  if (pageProps.protected && !auth && typeof window !== 'undefined') {
    router.push('/login')
  }

  if (pageProps.protected && auth && pageProps.userTypes && UserType != 'Admin') {
    return (<Check/>  )
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
