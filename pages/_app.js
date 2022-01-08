import '../styles/globals.css';
import '../styles/Home.module.css';
import GlobalProvider from '@/components/contexts/GlobalProvider';

import { useRouter } from 'next/router';
import Header from '@/components/default/Header';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { TodosContext } from '@/components/contexts/GlobalProvider';
import { Fragment, useContext } from 'react';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const ItemStyle = {
  flexGrow: 1, p: 12, marginTop: -20,  backgroundColor: '#f4f6f9'
}


export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { Login, IsLogged } = useContext(TodosContext);
  console.log(Login);

  if (pageProps.protected && !Login.login) {
    return <h1>Loading</h1>;
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

        <div className={!showBarLogin  ? "content-warp" : ""} >
          <DrawerHeader />
          <Component {...pageProps} />
        </div>
      </GlobalProvider>
    </>
  );
}
