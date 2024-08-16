import React, { useEffect } from 'react'
import Layout from './layout/Layout'
import Cookies  from 'js-cookie';

const App = () => {

  useEffect(()=>{
    const token = Cookies.get('token');
    console.log(token)
  },[])

  return <Layout/>
}

export default App