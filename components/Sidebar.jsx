import React from 'react'
import { DashboardIcon, HomeIcon, OrderIcon, ProductIcon, SettingIcon } from './Icons'
import Link from 'next/link'
import { useRouter } from 'next/router';


const Sidebar = () => {

  const inactivelink = 'flex items-center gap-1 p-1';
  const activelink = inactivelink + ' bg-white text-blue-900 rounded-l-lg'
  const router = useRouter();
  const {pathname} = router;

  return (
    <aside className='text-white p-4 pr-0'>
    <a className='flex items-center '>
        <DashboardIcon/>
        <span className='mr-4'>
          E-commerce Admin
        </span>
    </a>
    <nav className='flex flex-col gap-6 mt-6'>
      <Link href='/' className={pathname === '/' ? activelink : inactivelink}>
        <HomeIcon/>
        <span>
          Dashboard
        </span>
      </Link>
      <Link href='/products'  className={pathname.includes('/products') ? activelink : inactivelink}>
        <ProductIcon/>
        <span>
          Products
        </span>
      </Link>
      <Link href='/categories'  className={pathname.includes('/categories') ? activelink : inactivelink}>
        <OrderIcon/>
        <span>
          Categories
        </span>
      </Link>
      <Link href='/orders'  className={pathname.includes('/orders') ? activelink : inactivelink}>
        <OrderIcon/>
        <span>
          Orders
        </span>
      </Link>
      <Link href='/setting'  className={pathname.includes('/setting') ? activelink : inactivelink}>
        <SettingIcon/>
        <span>
          Setting
        </span>
      </Link>
    </nav>
    </aside>
  )
}

export default Sidebar