import Head from 'next/head';
import styles from '../styles/Home.module.css';
import * as React from 'react';
import ListProducts from '@/components/listProducts';
import {ToolsContext} from '@/components/ToolsContext';
import {styled} from '@mui/material/styles';
import {Modal,Button,Table,Box,TableBody,TableCell,TableContainer,TableHead,
TableRow,Paper,  tableCellClasses, Backdrop, Fade} from '@mui/material';
import {Iproduct} from "@/components/interfaces/interfaceProduct"
import axios from 'axios';
import useSWR from 'swr';
import AddProduct from '@/components/addProduct';
interface IProps {
  onAddProduct: (product:Iproduct) => void;
  product:Array<Iproduct>;
  onEdit:(product:Iproduct) => void;
}

type Product = {
  id: number
  sku: string
  name: string
  description: string
  price: number
  is_active: number
  created_at: string
  updated_at: string
  stock: number
  photo_file_name: string
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const Home = ()=> {
  /* Saber si el conext edit esta activo pero no sirve el cambio de estados entre componentees UseContext */
/*   let state: any = {};
  state = React.useContext(ToolsContext);
  const [ModalEditActive,setModalEditActive] = React.useState<Boolean>(state.state.ProductAdmin.isModalProducts)
   */

/*   console.log(state.state.ProductAdmin.isModalProducts) */
  /* COLOR HEADER TABLE */
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    }
  }));
  /* Check if state edit is enable */


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
   
  const { data, error } = useSWR('http://localhost:8080/products', fetcher);
  if (error) return 'An error has occurred.' + error;
  if (!data) return 'Loading...'; 
  return (
    <>
    <div className={styles.container}>
      <Head>
        <title>ApexShop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <Button variant="contained" color="primary" onClick={handleOpen}> Create a new Product</Button>
      <br/>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow >
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Sku</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Is Active</StyledTableCell>
            <StyledTableCell align="right">Created At</StyledTableCell>
            <StyledTableCell align="right">Updated At</StyledTableCell>
            <StyledTableCell align="right">Stock</StyledTableCell>
            <StyledTableCell align="right">Photo File Name</StyledTableCell>
            <StyledTableCell align="center">Options</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>       
           { 
            data?.map((usr: Product) => {
                  return <ListProducts key={usr.id} user={usr} />
            })
          } 
        </TableBody>
      </Table>
    </TableContainer>
      </main>
    </div>

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1500,
        }} className="modalProduct"
        >
           <Fade in={open}>
        <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        maxHeight:'90%',
        marginTop:'-1rem',
        overflow:'scroll',
        height:'100%',
        borderRadius:'2%',
      }}>
        {/* AQUI LLAMO EL RESTO DEL MODAL el form para agregar Nuevo Productos */}
          <AddProduct />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}



export default Home;
