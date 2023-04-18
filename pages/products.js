import Layout from '@/components/layout'
import React, { useEffect,useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { DeleteIcon, EditIcon } from '@/components/Icons'

const Products = () => {
  const [products,setProducts] = useState([]);
 

  useEffect(()=> {
    axios.get('/api/products').then(response =>{
      setProducts(response.data);
    })
  },[]);
  return (
    <Layout>
        <Link className='bg-green-700 text-white py-1 px-2 rounded-md' href={'/products/new'}>
          Add new product
        </Link>
        <table className='basic mt-4'>
          <thead>
            <tr>
              <td>Product className</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {products.map(product =>(
              <tr key={product._id}>
                <td>{product.name}</td>
                <td className='flex items-center gap-4'>
                  <Link href={'/products/edit/' + product._id}>
                    <EditIcon/>
                    Edit
                  </Link>
                  <Link href={'/products/delete/' + product._id}>
                    <DeleteIcon/>
                    Delete
                  </Link>


                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </Layout>
  )
}

export default Products