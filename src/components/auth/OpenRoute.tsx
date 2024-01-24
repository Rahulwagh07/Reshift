import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
 

function OpenRoute({ children}) {
    const { token } = useSelector((state: RootState) => state.auth)
    const router = useRouter();
    if (token === null) {
      return children
    } else {
        router.push('/dashboard')
        return;
    }
  }
  
export default OpenRoute