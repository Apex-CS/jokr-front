import React, { useContext, useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import {
  Toolbar,
  Box,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  MenuItem,
  Tooltip,
  Button,
  Menu,
  Grid,
} from '@mui/material';
import Router, { useRouter } from 'next/router';
import swal from 'sweetalert';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListAlt from '@mui/icons-material/ListAlt';
import Storefront from '@mui/icons-material/Storefront';
import PeopleAltOutlined from '@mui/icons-material/PeopleAltOutlined';
import LibraryBooks from '@mui/icons-material/LibraryBooks';
import Shop from '@mui/icons-material/AddShoppingCart';
import { TodosContext } from '@/components/contexts/GlobalProvider';
import Cart from '@/components/default/Cart';
import Link from 'next/link';
import Image from 'next/image';
import jokr from '@/public/jokr.png';
import stripe from '@/public/stripe.png';
const drawerWidth = 230;
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);
const accountPage = () => {
  Router.push('/User/account');
};


function MiniDrawer() {
  /*  ShopCart */
  const { cartItems } = useContext(TodosContext);
  const { Login, IsLogged } = useContext(TodosContext);
  const [cartOpen, setCartOpen] = useState(false);
  const router = useRouter()

  const logout = () => {
    swal({
      title: 'You will end the session, Do you want to continue?',
      text: 'Are you sure?',
      icon: 'warning',
      buttons: ['No', 'Yes'],
    }).then(async (res) => {
      if (res)
        swal({ icon: 'success', title: 'Good', text: 'Log out', timer: 2000 }).then(function () {
          localStorage.removeItem('token');
          Router.push('/login');
          router.reload();
        });
    });
  };


  const getTotalItems = (cartItems: any) => {
    const total = cartItems.reduce(
      (ack: number, cartItems: { id: number; sku: string; amount: number }) =>
        ack + cartItems.amount,
      0
    );
    return total;
  };

  /* ShopCart */
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', backgroundColor: '#f4f6f9' }}>
        {/*  <CssBaseline /> */}
        <AppBar position="fixed" open={open} sx={{ backgroundColor: '#131921' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              JOKR
            </Typography>
            <MuiDrawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
              <Cart cartItems={cartItems} />
              <footer style={{ marginTop: 'auto', display: 'flex', marginLeft: 20 }}>
                <Image src={stripe} alt="Stripe" width={120} height={55} />
                <Image src={jokr} alt="Picture of the author" width={120} height={55} />
              </footer>
            </MuiDrawer>
            <MenuItem onClick={() => setCartOpen(true)}>
              <IconButton size="large" aria-label="cart notifications" color="inherit">
                <Badge badgeContent={getTotalItems(cartItems)} color="error">
                  <Shop />
                </Badge>
              </IconButton>
            </MenuItem>

            <div className="postionR">
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button color="inherit" {...bindTrigger(popupState)}>
                      Options
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem onClick={accountPage}>My account</MenuItem>
                      <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {Login ? (
              <Tooltip title="List of products" placement="right">
                <ListItem>
                  <ListItemIcon>
                    <Link href="/products">
                      <a>
                        <ListAlt />
                      </a>
                    </Link>
                  </ListItemIcon>
                  <ListItemText> Products options</ListItemText>
                </ListItem>
              </Tooltip>
            ) : (
              ''
            )}

            {Login ? (
              <Tooltip title="List of users" placement="right">
                <ListItem>
                  <ListItemIcon>
                    <Link href="/users">
                      <a>
                        <PeopleAltOutlined />
                      </a>
                    </Link>
                  </ListItemIcon>
                  <ListItemText> Users options</ListItemText>
                </ListItem>
              </Tooltip>
            ) : (
              ''
            )}

            <Tooltip title="Home" placement="right">
              <ListItem>
                <ListItemIcon>
                  <Link href="/">
                    <a>
                      <Storefront />
                    </a>
                  </Link>
                </ListItemIcon>
                <ListItemText> JOKR products</ListItemText>
              </ListItem>
            </Tooltip>

           
              <Tooltip title="Order Histories" placement="right">
                <ListItem>
                  <ListItemIcon>
                    <Link href="/history">
                      <a>
                        <LibraryBooks />
                      </a>
                    </Link>
                  </ListItemIcon>
                  <ListItemText> Orders</ListItemText>
                </ListItem>
              </Tooltip>
         
          </List>
          <Divider />
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
          <DrawerHeader />
        </Box>
      </Box>
    </>
  );
}
export default MiniDrawer;
