import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

const page = async ()  => {
    const session = await getServerSession(authOptions)
    console.log(session)
    return (
      <div>Welcome to admin</div>
    )
  }
  
  export default page