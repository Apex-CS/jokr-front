import React from 'react'
import Router, { useRouter } from 'next/router';
function Check() {

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (token) {
      Router.push('/')
    } else {
    Router.push('/login')
    }
  };

export default Check
