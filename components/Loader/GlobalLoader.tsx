import React, { useContext, useState } from 'react';
import { TodosContext } from '@/components/contexts/GlobalProvider';
/* 
function ListProducts(props: { product: Product }) {
  const { product } = props; */

function GlobalLoader() {

  return (
    <>
      <section className="loaderGlobal">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </section>
    </>
  );
}

export default GlobalLoader;
