import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
function Check() {
  const router = useRouter();
  /* const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null; */
const token =  'Bearer '+localStorage.getItem('token')
  useEffect(() => {
    const timer = setTimeout(() => {
      const jwt = JSON.parse(atob(token.split('.')[1]));
      if (jwt.authorities.toString() != 'Admin') {
        Router.push('/');
      } else {
       /*  router.reload(router.pathname); */
     
       router.reload()
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="titleChrck">

        <h1>We are checking something... !Dont worry</h1>
      </div>
      <section className="loaderGlobal">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </section>
    </>
  );
}

export default Check;
