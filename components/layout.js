import { useSession, signIn, signOut } from "next-auth/react"
import Sidebar from "@/components/Sidebar";

export default function Layout({children}) {
  const { data: session } = useSession();
  if(!session){
    return (
      <div className='bg-blue-800 w-screen h-screen flex items-center justify-center'>
        <div className='bg-white p-3 flex items-center justify-between rounded-md gap-2'>
          <img src='/assets/google.png' alt='google image' className='w-10 h-10'/>
          <button onClick={() => signIn('google')} className='font-medium text-base'>Login with google</button>
        </div>
      </div>
  )
    }
    return(
      <div className="bg-blue-900 text-black h-screen w-screen flex">
        <Sidebar/>
        <div className="font-medium rounded-lg p-4 bg-white flex-grow mt-1 mr-1">{children}</div>
      </div>
    )
}