import { useState } from 'react';
interface EnableModal {
  /* Logeado: boolean; */
  Logeado:boolean;
}

function ProductAdmin(props: { Logeado: EnableModal }) {
  const [ModalEditActive, setModalEditActive] = useState<boolean>(false);
  const {Logeado} = props 
  
  return {
    isModalProducts:[ModalEditActive,setModalEditActive],
  };
}

export default ProductAdmin;
