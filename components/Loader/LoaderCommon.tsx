import React, { useContext, useEffect } from 'react';
import { Container } from '@mui/material';

function Loader() {
    return (
    <>
      <Container>
      <section className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </section>
      </Container>
    </>
  );
}

export default Loader;
