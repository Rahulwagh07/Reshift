"use client"
import { RootState } from "../redux/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
 

export default function Page(): JSX.Element {
  const router = useRouter()
  const { token } = useSelector((state: RootState) => state.auth);
  return (
    <div className="text-center mt-20">Hello........
    {
      token !== null ? (<p>found</p>) : <p> not found</p>
    }
    </div>
  );
}
