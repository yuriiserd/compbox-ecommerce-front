import AccountLayout from "@/components/AccountLayout";
import { useSession } from "next-auth/react";

export default function AccountPage() {
  
  const {data: session} = useSession();
  

  return (
    <AccountLayout>
      <h2>Account Details</h2>
      <p>Logged in as {session?.user?.email}</p>
      
    </AccountLayout>
  )
}