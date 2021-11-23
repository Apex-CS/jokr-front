import React from 'react';
interface EnableModal {
  Logeado: Boolean;
}

function ProductAdmin(props: { Logeado: EnableModal }) {
  const [ModalEditActive, setModalEditActive] = React.useState<Boolean>(false);

  return {
    isModalProducts: ModalEditActive,
    setModalEditActive,
  };
}

export default ProductAdmin;
