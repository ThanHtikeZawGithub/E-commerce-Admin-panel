import { CorrectIcon, WrongIcon } from '@/components/Icons'
import React, { useEffect, useState } from 'react'
import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import axios from 'axios'


const DeleteProductPage = () => {
    const router = useRouter();
    const {id} = router.query;
    const [productInfo, setProductInfo] = useState();

    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/api/products?id=' + id).then(response=>{
            setProductInfo(response.data);
        })
    },[]);

    const goBack = ()=> {
        router.push('/products');
    }

    const deleteProduct = async() => {
        await axios.delete('/api/products?id='+id);
        goBack();
    }

  return (
    <Layout >
        <div>
        <h1>Do you really want to delete &nbsp; "{productInfo?.name}"?</h1>
        <div className='flex items-center gap-6'>
        <button onClick={deleteProduct} className='rounded-full bg-green-600 text-white'>
            <CorrectIcon/>
        </button>
        <button onClick={goBack} className='rounded-full bg-red-600 text-white'>
            <WrongIcon/>
        </button>
        </div>
        </div>
    </Layout>
  )
}

export default DeleteProductPage