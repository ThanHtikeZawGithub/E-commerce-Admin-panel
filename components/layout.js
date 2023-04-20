import { useSession, signIn, signOut } from "next-auth/react"
import Sidebar from "@/components/Sidebar";
import { HamburgerIcon } from "./Icons";
import { useState } from "react";
import Logo from "./Logo";

export default function Layout({children}) {
  const { data: session } = useSession();
  const [isToggled, setIsToggled] = useState(false);


  if(!session){
    return (
      <div className='bg-primary1 w-screen h-screen flex items-center justify-center'>
        <div className='bg-white p-3 flex items-center justify-between rounded-md shadow-lg gap-2'>
          <img src='/assets/google.png' alt='google image' className='w-10 h-10'/>
          <button onClick={() => signIn('google')} className='font-medium text-base'>Login with google</button>
        </div>
      </div>
  )
    }
    return(
      <div className="bg-primary2 min-h-screen">
        <div className="md:hidden flex items-center gap-4 p-4">
        <button onClick={()=> setIsToggled(prev => !prev)}>
          <HamburgerIcon/>
        </button>
        <Logo/>
        </div>
      
          <div className=" text-black flex">
        <Sidebar show={isToggled}/>
        <div className="font-medium flex-grow p-4">{children}</div>
      </div>
      </div>
    )
}