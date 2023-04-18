import ProductForm from '@/components/ProductForm';
import Layout from '@/components/layout'
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const EditProductPage = () => {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const {id} = router.query;
  useEffect(()=>{
    if(!id){
      return ;
    }
    axios.get('/api/products?id=' +id).then(response =>{
      setProductInfo(response.data);
    })
  },[]);

  return (
    <Layout>
      <h1 className="text-xl">
        Edit product
        </h1>
      {productInfo && (
        <ProductForm {...productInfo}/>
      )}
    </Layout>
  )
}

export default EditProductPage