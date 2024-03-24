import { RootState } from "../../redux/store";
import { useRouter } from "next/navigation"
import { ReactNode } from "react";
import { useSelector } from "react-redux"
 
function PrivateRoute({ children} : {children:ReactNode}) {
  const { token } = useSelector((state: RootState) => state.auth)
  const router = useRouter();

  if (token !== null) {
    return children
  } else {
    router.push('/login')
    return;   
  }
}

export default PrivateRoute