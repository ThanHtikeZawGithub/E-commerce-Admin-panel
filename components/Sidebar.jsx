import React from 'react'
import { DashboardIcon, HomeIcon, LogoutIcon, OrderIcon, ProductIcon, SettingIcon } from './Icons'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import Logo from './Logo';


const Sidebar = ({show}) => {

  const inactivelink = 'font-semibold flex items-center gap-1 p-1';
  const activelink = inactivelink + ' bg-primary1 text-black rounded-sm'
  const router = useRouter();
  const {pathname} = router;

  async function logout() {
    await router.push('/');
    await signOut();
  }

  return (
    <aside className={(show ? 'left-0' : '-left-full') + 
    ' top-0 fixed w-full h-full bg-primary2 text-gray-500 p-4 md:static md:w-auto transition-all duration-500'}>
      <Logo/>
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
      <button onClick={logout}  className={inactivelink}>
        <LogoutIcon/>
        <span>
          Logout
        </span>
      </button>
    </nav>
    </aside>
  )
}

export default Sidebar