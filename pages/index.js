import Layout from "@/components/layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session} = useSession();
  console.log(session)
  return <Layout>
    <div className="text-blue-900 flex justify-between">
      <h3>Logged In as <span className="font-bold text-lg">{session?.user?.email}</span></h3>
      <div className="flex gap-1">
      <img src={session?.user?.image} alt='user Image' className="w-6 h-6" />
      <span>
        {session?.user.name}
      </span>
    </div>
    </div>
  </Layout>
};
