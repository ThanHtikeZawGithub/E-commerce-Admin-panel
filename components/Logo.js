import React from 'react'
import { DashboardIcon } from './Icons'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href={'/'} className='flex items-center gap-1 '>
        <DashboardIcon/>
        <span className='mr-4 font-bold text-lg text-gray-500'>
          E-commerce Admin
        </span>
    </Link>
  )
}

export default Logo